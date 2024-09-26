"use server";

import { signIn } from "@/lib/auth";
import { SignInSchemaT } from "@/schema/user";
import { AccessDenied, SignInError } from "@auth/core/errors";
export async function signInAction(
  formData: SignInSchemaT,
  redirectTo: string = "/announcements",
) {
  try {
    await signIn("credentials", { ...formData, redirectTo });
  } catch (err: unknown) {
    if (err instanceof SignInError || err instanceof AccessDenied) {
      return { error: true, type: err.type };
    }

    throw err;
  }
}
