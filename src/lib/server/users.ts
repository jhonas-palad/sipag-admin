import { UserSchemaT } from "@/schema/user";
import { secureFetch } from "@/lib/server";
import { CONSTANT_KEYS } from "../constant-keys";

export async function getUserList(): Promise<UserSchemaT[]> {
  return await secureFetch("/api/v1/users?is_staff=false", true, {
    next: { tags: [CONSTANT_KEYS.USERS] },
  });
}

export type UserPointsDetail = {
  user: UserSchemaT;
  count: number;
  redemeed: boolean;
};
export async function getUserPointsDetail(
  id: string,
): Promise<UserPointsDetail> {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  return await secureFetch(
    `/api/v1/waste-reports/cleaner-details/${id}`,
    true,
    {
      next: { tags: [CONSTANT_KEYS.USERS, CONSTANT_KEYS.USERS + id] },
    },
  );
}

type RedeemRecordT = {
  cleaner_points: UserPointsDetail;
  assisted_by: UserSchemaT;
  claimed_date: string;
};

export async function getRedeemPointsRecords(
  cleaner_id: string,
): Promise<RedeemRecordT[]> {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  return await secureFetch(
    `/api/v1/waste-reports/redeem-records?cleaner_points=${cleaner_id}`,
    true,
    {
      next: {
        tags: [
          CONSTANT_KEYS.REDEEM_HISTORY,
          CONSTANT_KEYS.REDEEM_HISTORY + cleaner_id,
        ],
      },
    },
  );
}
