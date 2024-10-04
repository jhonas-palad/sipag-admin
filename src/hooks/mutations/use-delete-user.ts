import { deleteUserAction } from "@/actions/users";
import { CONSTANT_KEYS } from "@/lib/constant-keys";
import { UserSchemaT } from "@/schema/user";
import { ActionFailedResult } from "@/types/actions";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = (
  id: UserSchemaT["id"],
  {
    onSettled,
  }: { onSettled?: (data: any, error: any, variables: string) => any },
) => {
  const m = useMutation({
    mutationKey: [CONSTANT_KEYS.USERS + id],
    mutationFn: deleteUserAction,
    onSettled: (data, error, variables) => {
      console.log({ data, error });
      if (error) {
        return onSettled?.(
          null,
          {
            errors: { detail: error.message, status: 500 },
          },
          variables,
        );
      }
      if (data) {
        if (data?.success) {
          return onSettled?.(data, null, variables);
        }
        if ((data as ActionFailedResult)?.errors) {
          return onSettled?.(null, data, variables);
        }
      }
      return onSettled?.(data, error, variables);
    },
  });
  return m;
};
