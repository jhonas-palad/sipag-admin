"use client";

import { type ActionSuccessResult, ActionFailedResult } from "@/types/actions";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { type UserSchemaT } from "@/schema/user";
import { Badge } from "@/components/ui/badge";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVerifyUser } from "@/hooks/mutations/use-verify-user";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useCallback, useMemo } from "react";
import { VerifyMutateParams } from "@/actions/users";
import { DeleteButton } from "@/components/users/verify-btn";

export const columns: ColumnDef<UserSchemaT>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "is_verified",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("is_verified") ? (
        <Badge className="bg-green-500">Verified</Badge>
      ) : (
        <Badge variant="outline">Not Verified</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: (props) => <UserTableActions {...props} />,
  },
];

const UserTableActions = ({ row }: CellContext<UserSchemaT, unknown>) => {
  const verified = row.getValue("is_verified");
  const { toast } = useToast();
  const rowId = useMemo(() => row.getValue("id") as string | number, [row]);

  const { mutateAsync } = useVerifyUser({
    onSettled: (data) => {
      if ((data as ActionSuccessResult)?.success) {
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
      id: rowId,
      action: verified ? "unverify" : "verify",
    } as VerifyMutateParams;
    if (verified) {
      await mutateAsync(params);
    } else {
      await mutateAsync(params);
    }
  }, [rowId, verified, mutateAsync]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="pointer-events-none">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleAction}>
          {verified ? "Unverify" : "Verify"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="bg-red-500 font-semibold text-neutral-50"
        >
          <DeleteButton id={rowId as string} className="w-full cursor-pointer"/>
          {/* Delete User */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
