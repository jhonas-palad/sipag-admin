"use server";
import { FetchError } from "@/lib/errors/fetch-error";
import { secureFetch } from "@/lib/server";
import { revalidateTag } from "next/cache";
import { ActionResult } from "@/types/actions";
import { CONSTANT_KEYS } from "@/lib/constant-keys";

export type VerifyMutateParams = {
  id: string | number;
  action: "verify" | "unverify";
};
export const verifyUserAction = async ({
  id,
  action,
}: VerifyMutateParams): Promise<ActionResult> => {
  try {
    const data = await secureFetch(`/api/v1/users/${id}`, false, {
      method: "PATCH",
      body: JSON.stringify({
        is_verified: action === "verify",
      }),
    });
    revalidateTag(CONSTANT_KEYS.USERS + id);
    return { success: true, result: data };
  } catch (err) {
    if (err instanceof FetchError) {
      return {
        ...err.details,
        status: err.status,
      };
    }
    throw err;
  }
};

export const claimPointsAction = async (
  cleanerId: number,
): Promise<ActionResult> => {
  try {
    const data = await secureFetch(
      `/api/v1/waste-reports/redeem-records`,
      false,
      {
        method: "POST",
        body: JSON.stringify({
          cleaner_points: cleanerId,
        }),
      },
    );

    revalidateTag(CONSTANT_KEYS.REDEEM_HISTORY);
    return { success: true, result: data };
  } catch (err) {
    console.log(err);
    if (err instanceof FetchError) {
      return {
        ...err.details,
        status: err.status,
      };
    }
    throw err;
  }
};
