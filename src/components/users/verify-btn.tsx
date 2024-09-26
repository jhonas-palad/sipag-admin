"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useVerifyUser } from "@/hooks/mutations/use-verify-user";
import { ActionFailedResult, ActionSuccessResult } from "@/types/actions";
import { toast } from "@/hooks/use-toast";
import { VerifyMutateParams } from "@/actions/users";
import { ToastAction } from "@/components/ui/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

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
  console.log(verified, data);
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
