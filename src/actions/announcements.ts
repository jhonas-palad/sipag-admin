"use server";

import { type AnnouncementT } from "@/schema/announcements";
import { secureFetch } from "@/lib/server";
import { revalidateTag } from "next/cache";
import { CONSTANT_KEYS } from "@/lib/constant-keys";
export const postAnnouncementAction = async (body: AnnouncementT) => {
  const data = await secureFetch("/api/v1/announcements/public", true, {
    method: "POST",
    body: JSON.stringify(body),
  });
  revalidateTag(CONSTANT_KEYS.ANNOUNCEMENTS);
  return data;
};
export const deleteAnnouncementAction = async (id: AnnouncementT["id"]) => {
  const data = await secureFetch("/api/v1/announcements/public/" + id, true, {
    method: "DELETE",
  });
  revalidateTag(CONSTANT_KEYS.ANNOUNCEMENTS);
  return data;
};
