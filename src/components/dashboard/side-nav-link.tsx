"use client";
import { useMemo } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/actions/auth";

const regex = /^\/(announcements|users|points)(?:\/([a-zA-Z0-9_-]+))*/;

export const SidenavWrapper = ({ ...props }: ButtonProps) => {
  return <Button {...props} className="w-full justify-start p-6" asChild />;
};
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
    <SidenavWrapper variant={current ? "outline" : "ghost"}>
      <Link {...props} className="leading gap-2 text-base text-neutral-600" />
    </SidenavWrapper>
  );
};

export const SignOut = () => (
  <SidenavWrapper variant="ghost" onClick={() => signOutAction()}>
    <span className="leading gap-2 text-base text-neutral-600 cursor-pointer">
      <ExitIcon /> Signout
    </span>
  </SidenavWrapper>
);
