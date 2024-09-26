import { claimPointsAction } from "@/actions/users";
import { useMutation } from "@tanstack/react-query";
import {
  ActionResult,
  ActionFailedResult,
  ActionSuccessResult,
} from "@/types/actions";

export function useClaimPoints({
  onSettled,
}: {
  onSettled: (data: string, error: string, variable: number) => void;
}) {
  return useMutation<ActionResult, Error, number>({
    mutationFn: claimPointsAction,
    onSettled: (data, error, variable) => {
      let errorMessage = "";
      if ((data as ActionFailedResult)?.errors) {
        const errors = (data as ActionFailedResult).errors;
        const status = (data as ActionFailedResult)?.status;
        if (status === 400) {
          errorMessage = "Can't redeem reward at the moment.";

          // errorMessage = Array.isArray(errors?.cleaner_points)
          //   ? errors?.cleaner_points[0]
          //   : errors?.cleaner_points;
        }
        if (status === 500) {
          errorMessage = "Internal Server Error";
        }
        console.error(errors);
      }

      let successMessage = "";
      if ((data as ActionSuccessResult)?.success) {
        successMessage = (data as ActionSuccessResult).result;
      }

      onSettled?.(successMessage, errorMessage, variable);
      return data;
    },
  });
}
