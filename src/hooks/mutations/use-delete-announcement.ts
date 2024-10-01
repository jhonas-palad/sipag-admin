import { deleteAnnouncementAction } from "@/actions/announcements";
import { CONSTANT_KEYS } from "@/lib/constant-keys";
import { AnnouncementT } from "@/schema/announcements";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAnnouncement = (
  id: AnnouncementT["id"],
  {
    onSettled,
  }: { onSettled?: (data: any, error: any, variables?: string) => any },
) => {
  const m = useMutation({
    mutationKey: [CONSTANT_KEYS.ANNOUNCEMENTS + id],
    mutationFn: deleteAnnouncementAction,
    onSettled: (data, error) => {
      if (error) {
        return onSettled?.(null, {
          errors: { detail: error.message, status: 500 },
        });
      }
      if (data === undefined) {
        return onSettled?.(true, error);
      }
      return onSettled?.(data, error);
    },
  });
  return m;
};
