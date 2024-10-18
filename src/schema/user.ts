import * as z from "zod";
import { PhotoSchema } from "./photo";
export const UserSchema = z.object({
  id: z.string().readonly(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  photo: PhotoSchema,
  is_verified: z.boolean(),
  last_login: z.string().nullish(),
  date_joined: z.string(),
  is_active: z.boolean(),
  groups: z.array(z.string()),
  user_permissions: z.array(z.string()),
});
export type UserSchemaT = z.infer<typeof UserSchema>;

export const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInSchemaT = z.infer<typeof signInSchema>;
