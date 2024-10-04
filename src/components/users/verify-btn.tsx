"use client";
import React, { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActionFailedResult, ActionSuccessResult } from "@/types/actions";
import { VerifyMutateParams } from "@/actions/users";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useVerifyUser } from "@/hooks/mutations/use-verify-user";
import { useDeleteUser } from "@/hooks/mutations/use-delete-user";
import { toast, useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";

export const VerifyButton = ({
  id,
  verified,
}: {
  id: string;
  verified: boolean;
}) => {
  const [isVerified, setIsVerified] = useState(verified);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useVerifyUser({
    onSettled: (data) => {
      if ((data as ActionSuccessResult)?.success) {
        setIsVerified((data as ActionSuccessResult).result.is_verified);
        queryClient.setQueryData(["VERIFIED_BADGE" + id], () => {
          return (data as ActionSuccessResult).result.is_verified;
        });
        toast({
          variant: "success",
          description:
            "User successfully " + (verified ? "unverified" : "verified"),
        });
      } else if ((data as ActionFailedResult)?.errors) {
        const status = (data as ActionFailedResult)?.status;
        let message;
        if (status === 404) {
          message = "User not found";
        }

        if (status === 500) {
          message = "Internal Server Error";
        }
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message ?? "There was a problem occured." + status,
          action: (
            <ToastAction altText="Retry" onClick={handleAction}>
              Retry
            </ToastAction>
          ),
        });
      } else {
        toast({
          variant: "default",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with occured in the server.",
          action: (
            <ToastAction altText="retry" onClick={handleAction}>
              Retry
            </ToastAction>
          ),
        });
      }
    },
  });

  const handleAction = useCallback(async () => {
    const params = {
      id: id,
      action: isVerified ? "unverify" : "verify",
    } as VerifyMutateParams;
    if (isVerified) {
      await mutateAsync(params);
    } else {
      await mutateAsync(params);
    }
  }, [id, isVerified, mutateAsync]);
  return (
    <>
      <Button
        onClick={handleAction}
        disabled={isPending}
        variant={isVerified ? "secondary" : "default"}
      >
        {isVerified ? "Unverify" : "Verify"}
      </Button>
    </>
  );
};

export const VerifiedBadge = ({
  id,
  verified,
}: {
  id: string;
  verified: boolean;
}) => {
  const { data } = useQuery({
    queryKey: ["VERIFIED_BADGE" + id],
    queryFn: () => verified,
  });
  if (data) {
    return (
      <Badge variant="default" className="bg-green-500">
        Verified
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-center">
      Not verified
    </Badge>
  );
};

const DeleteButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { mutate } = useDeleteUser(id, {
    onSettled(data, error) {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error occured",
          description:
            error.status === 404
              ? "User details not found"
              : "Something went wrong in server side.",
        });
      }
      if (data) {
        toast({
          variant: "success",
          title: "Success",
          description: "User has been deleted.",
        });
      }
      setDialogOpen(false);
      router.prefetch("/users");
      router.replace("/users");
      console.log(data, error);
    },
  });
  const handleDelete = useCallback(() => {
    mutate(id);
  }, [mutate, id]);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className={className}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            user&apos;s data
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteButton };
