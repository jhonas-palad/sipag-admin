import React from "react";
import { SideNav } from "@/components/dashboard/SideNav";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <SideNav />
      <div className="flex-1">
        <PageHeader />
        <ScrollArea className="h-[calc(100vh-7rem)]">{children}</ScrollArea>
      </div>
    </div>
  );
};

export default ProtectedLayout;
