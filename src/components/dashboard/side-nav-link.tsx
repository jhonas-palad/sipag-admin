"use client";
import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const regex = /^\/(announcements|users|points)(?:\/([a-zA-Z0-9_-]+))*/;

export const SideNavLink = ({
  ...props
}: LinkProps & { children: React.ReactNode }) => {
  const pathname = usePathname();
  const match = pathname.match(regex);
  const current = useMemo(() => {
    if (`/${match![1]!}` === props.href) {
      return true;
    }
    return false;
  }, [match, props.href]);

  return (
    <Button
      asChild
      variant={current ? "outline" : "ghost"}
      className="w-full justify-start p-6"
    >
      <Link {...props} className="leading gap-2 text-base text-neutral-600" />
    </Button>
  );
};
