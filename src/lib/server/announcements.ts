import { secureFetch } from "@/lib/server";
import { CONSTANT_KEYS } from "../constant-keys";

export const getPublicAnnouncements = async () => {
  return await secureFetch("/api/v1/announcements/public", true, {
    next: { tags: [CONSTANT_KEYS.ANNOUNCEMENTS] },
  });
};

export const getPublicAnnouncement = async (id: string) => {
  return await secureFetch("/api/v1/announcements/public/" + id, true, {
    next: {
      tags: [CONSTANT_KEYS.ANNOUNCEMENTS, CONSTANT_KEYS.ANNOUNCEMENTS + id],
    },
  });
};
