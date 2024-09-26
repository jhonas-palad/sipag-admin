"use client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { percentage } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useClaimPoints } from "@/hooks/mutations/use-claim-points";

type PointProgressProps = {
  userId: number;
  points: number;
  maxPoints: number;
};
export const PointProgress = ({
  userId,
  points,
  maxPoints,
}: PointProgressProps) => {
  const [percentPoints, setPercentPoints] = useState(() => {
    if (!points) {
      return 0;
    }
    return percentage(+points, maxPoints);
  });

  const [ableToClaim, setAbleToClaim] = useState(() => {
    return points >= maxPoints;
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: claimPoints } = useClaimPoints({
    onSettled: (data, error) => {
      console.log(data, error);
      if (data) {
        setAbleToClaim(false);
        setPercentPoints(0);
      }
      if (error) {
        setErrorMessage(error);
      }
    },
  });
  console.log(ableToClaim, points);
  const handleClaimRewards = useCallback(() => {
    if (!ableToClaim) {
      return;
    }
    claimPoints(userId);
  }, [ableToClaim, claimPoints, userId]);

  return (
    <>
      <div className="mb-1 flex flex-row items-center justify-between">
        <Label className="text-lg font-semibold">Points</Label>
        <p>
          {points}/{maxPoints}
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Progress
          className="h-9 rounded-md bg-neutral-200"
          value={percentPoints}
        />
        <Button
          onClick={handleClaimRewards}
          variant="outline"
          disabled={!ableToClaim}
          className="bg-green-400 text-white"
        >
          Claim reward
        </Button>
      </div>
      {errorMessage && (
        <div className="mt-2">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}
    </>
  );
};
