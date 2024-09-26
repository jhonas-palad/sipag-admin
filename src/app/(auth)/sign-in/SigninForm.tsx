"use client";
import React, { useCallback } from "react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/actions/auth";
import { useMutation } from "@tanstack/react-query";
import { SignInSchemaT } from "@/schema/user";
import { SigninFailedAlert } from "./signin-failed-alert";
export const SigninForm = () => {
  const form = useForm({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signInAction,
    throwOnError: true,
    onSuccess: (data) => {
      if (data && data?.error) {
        if (data.type === "AccessDenied") {
          form.setError("root", {
            message: "Only admin can only signin to this page.",
          });
        } else {
          form.setError("root", {
            message: " Please check your credentials. Make sure it's correct.",
          });
        }
      }
    },
  });
  const handleSubmit = form.handleSubmit(
    useCallback(
      async (formData: SignInSchemaT) => {
        mutateAsync(formData);
      },
      [mutateAsync],
    ),
  );
  return (
    <Form {...form}>
      {/*@ts-ignore */}
      {form.getFieldState("root").invalid && (
        <div className="mb-6">
          <SigninFailedAlert
            //@ts-ignore
            description={form.getFieldState("root").error?.message}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="example-admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
          <Button className="w-full" disabled={isPending}>
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};
