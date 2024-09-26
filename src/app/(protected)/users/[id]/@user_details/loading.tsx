import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <Card className="m-12 min-w-[32rem]">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>This is a read only details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-12">
        <div className="flex w-28 flex-col items-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <Skeleton className="h-8 rounded-md" />
          <Skeleton className="h-8 rounded-md" />
          <Skeleton className="h-8 rounded-md" />
          <Skeleton className="h-8 rounded-md" />
          <Skeleton className="col-span-2 col-start-1 h-8 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default loading;
