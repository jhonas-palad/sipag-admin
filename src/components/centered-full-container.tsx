import React from "react";
import { cn } from "@/lib/utils";
export const CenteredFullContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid h-screen w-full place-items-center", className)}>
      {children}
    </div>
  );
};
