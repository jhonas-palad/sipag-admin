import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { verifyUserAction, type VerifyMutateParams } from "@/actions/users";
import { ActionResult } from "@/types/actions";

export const useVerifyUser = ({
  onSettled,
}: {
  onSettled: UseMutationOptions<
    ActionResult,
    Error,
    VerifyMutateParams
  >["onSettled"];
}) => {
  return useMutation<ActionResult, Error, VerifyMutateParams>({
    mutationFn: verifyUserAction,
    onSettled,
  });
};
