import * as zod from "zod";
import { UserSchema } from "./user";

export const createAnnouncementSchema = zod.object({
  id: zod.string().nullish(),
  title: zod.string().min(1, { message: "Title is required" }).max(255),
  description: zod
    .string()
    .min(1, { message: "Description is required" })
    .max(500, {
      message: "Description should only contain 500 characters only",
    }),
  by: UserSchema.nullish(),
});

export type AnnouncementT = zod.infer<typeof createAnnouncementSchema>;
