// "use client";

import { Announcement } from "@/types/announcement";
// import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Link from "next/link";
export const AnnouncementList = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  // const { data } = useQuery({
  //   initialData: announcements,
  //   queryKey: ["ANNOUNCEMENTS"],
  // });
  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      {announcements.length ? (
        announcements.map(({ id, title, description, date_created }) => {
          return (
            <Button
              key={id}
              asChild
              className="h-auto w-full flex-col items-start justify-start border shadow-sm"
              variant="ghost"
            >
              <Link href={`/announcements/${id}`}>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 line-clamp-2 text-wrap text-sm text-neutral-500">
                  {description}
                </p>
                <small className="mt-1 text-xs text-neutral-400">
                  {date_created}
                </small>
              </Link>
            </Button>
          );
        })
      ) : (
        <p className="text-center text-neutral-500">No announcement listed</p>
      )}
    </div>
  );
};
