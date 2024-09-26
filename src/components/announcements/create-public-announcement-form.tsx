"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnnouncementT,
  createAnnouncementSchema,
} from "@/schema/announcements";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreatePublicAnnouncement } from "@/hooks/mutations/use-create-public-announcement";
import { useToast } from "@/hooks/use-toast";

export const CreatePublicAnnouncementForm = ({
}: {
  navigateBack?: boolean | string;
}) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { mutate, isPending } = useCreatePublicAnnouncement({
    onSettled(data) {
      if (data) {
        form.reset();
        toast({
          variant: "success",
          title: "Create announcement",
          description: "New announcement was created",
        });
        // if (navigateBack === true || navigateBack === undefined) {
        //   router.back();
        // }
      }
    },
  });
  const handleSubmit = form.handleSubmit((data: AnnouncementT) => {
    mutate(data);
  });
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>
                This is display title for announcement.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Type here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6" onClick={handleSubmit} disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
