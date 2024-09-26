import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
const loading = () => {
  return (
    <main className="">
      <div className="mx-32 mt-6">
        <div className="mb-6">
          <Label className="text-lg font-semibold text-neutral-700">
            List of announcements
          </Label>
        </div>
        <div className="[&_*]:mb-3">
          {new Array(3).fill(0).map((i) => {
            return <Skeleton key={i} className="h-20 w-full" />;
          })}
        </div>
      </div>
    </main>
  );
};

export default loading;
