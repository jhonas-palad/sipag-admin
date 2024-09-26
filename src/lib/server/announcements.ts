import { secureFetch } from "@/lib/server";

export const getPublicAnnouncements = async () => {
  return secureFetch("/api/v1/announcements/public", true);
};

