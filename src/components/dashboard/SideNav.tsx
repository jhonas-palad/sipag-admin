import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SideNavLink } from "./side-nav-link";
import { auth } from "@/lib/auth";
import { getTitleNameInitials } from "@/lib/utils";
import { BellIcon, PersonIcon } from "@radix-ui/react-icons";

export const SideNav = async () => {
  const session = await auth();
  return (
    <nav className="flex w-80 border-r border-neutral-200">
      <div className="flex w-full flex-col gap-10 px-4">
        <header className="flex items-center justify-start py-4">
          <Image
            src="/images/sipag-logo.png"
            width={80}
            height={80}
            alt="Sipag Logo"
            className="-ml-4"
          />
          <h4 className="text-neutral-700">SIPAG</h4>
        </header>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Avatar className="h-20 w-20">
            {session?.user.photo && (
              <AvatarImage src={session?.user.photo.img_file} />
            )}
            <AvatarFallback>
              {getTitleNameInitials(
                `${session?.user.first_name} ${session?.user.last_name}`,
              )}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="large leading line-clamp-2 text-lg font-bold text-neutral-700">
              {(session?.user.first_name ? session?.user.first_name : "?") +
                " " +
                (session?.user.last_name ? session?.user.last_name : "?")}
            </p>
            <p className="leading text-neutral-500 [&:not(:first-child)]:mt-2">
              {session?.user.phone_number}
            </p>
          </div>
        </div>
        <div className="flex flex-col px-5">
          <SideNavLink href="/announcements">
            <BellIcon />
            Announcements
          </SideNavLink>
          <SideNavLink href="/users">
            <PersonIcon /> Users
          </SideNavLink>
        </div>
      </div>
    </nav>
  );
};
