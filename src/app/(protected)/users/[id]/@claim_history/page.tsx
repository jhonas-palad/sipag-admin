import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getRedeemPointsRecords } from "@/lib/server/users";
import { format } from "date-fns";
const dateFormat = (date: string, withTime: boolean = false) => {
  if (withTime) {
    return format(date, "PPpp");
  }
  return format(date, "PP");
};
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const history = await getRedeemPointsRecords(id);
  return (
    <div className="m-12">
      <h3>Claim History</h3>
      {history.length ? (
        <ul className="list-none [&_li]:mb-6">
          {history.map((record, index) => (
            <li key={index}>
              <Card>
                <CardContent className="grid grid-cols-3 items-center justify-between p-6">
                  <p className="line-clamp-1">
                    Assisted by: <span className="font-bold">Jhonas Palad</span>
                  </p>
                  <p className="text-center">
                    Points: <span className="font-bold">10</span>
                  </p>
                  <p className="text-center text-base">
                    {dateFormat(record.claimed_date)}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-neutral-500">No claim history yet</p>
      )}
    </div>
  );
};

export default page;
