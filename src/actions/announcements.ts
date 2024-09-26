"use server";

import { type AnnouncementT } from "@/schema/announcements";
import { secureFetch } from "@/lib/server";
export const postAnnouncementAction = async (body: AnnouncementT) => {
  // createAnnouncementSchema.spa(body);

  // const result = createAnnouncementSchema.safeParse(body);
  // if (!result.success) {
  //   // handle error then return
  //   result.error;
  // } else {
  //   // do something
  //   result.data;
  // }

  const data = await secureFetch("/api/v1/announcements/public", true, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
};
