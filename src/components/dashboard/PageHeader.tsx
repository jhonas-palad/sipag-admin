"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const regex = /^\/(announcements|users|points)(?:\/([a-zA-Z0-9_-]+))*/;
export const PageHeader = (props: React.PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const headerProps = useMemo(() => {
    const match = pathname.match(regex);
    let hasBack = false;

    if (match) {
      if (match[2]) {
        hasBack = true;
      }
      return { hasBack, title: match[1].toUpperCase() };
    }

    return { hasBack, title: "" };
  }, [pathname]);

  return (
    <header className="relative flex w-full flex-row border-b border-neutral-200 py-8">
      <div className="absolute left-2">
        {headerProps.hasBack ? (
          <Button variant="link" onClick={() => router.back()}>
            Back
          </Button>
        ) : null}
      </div>
      <h3 className="w-full text-center text-neutral-600">
        {headerProps?.title ?? props.children}
      </h3>
    </header>
  );
};
