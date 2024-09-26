import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAnnouncementAction } from "@/actions/announcements";
import { ActionFailedResult } from "@/types/actions";
import { AnnouncementT } from "@/schema/announcements";
import { Announcement } from "@/types/announcement";

export const useCreatePublicAnnouncement = ({
  onSettled,
}: {
  onSettled: (
    data: Announcement | undefined,
    error: string,
    variable: AnnouncementT,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAnnouncementAction,
    onSettled: (data, error, variable) => {
      let errorMessage;
      if ((data as ActionFailedResult)?.errors) {
        const errors = (data as ActionFailedResult).errors;
        const status = (data as ActionFailedResult)?.status;
        if (status === 400) {
          errorMessage = errors;
        }
        if (status >= 500) {
          errorMessage = { detail: "Internal Server Error" };
        }
      }

      let successMessage: Announcement | undefined;
      if (data?.id) {
        successMessage = data as Announcement;
        queryClient.setQueryData(["ANNOUNCEMENTS"], (old: Announcement[]) => {
          if (Array.isArray(old)) {
            return [successMessage, ...old];
          }
        });
      }
      onSettled?.(successMessage, errorMessage, variable);
      return data;
    },
  });
};
