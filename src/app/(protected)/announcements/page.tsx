import { AnnouncementList } from "@/components/announcements/announcement-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getPublicAnnouncements } from "@/lib/server/announcements";
import Link from "next/link";

import React from "react";

const AnnouncementPage = async () => {
  const announcements = await getPublicAnnouncements();
  return (
    <main className="">
      <div className="mx-32 mt-6">
        <div className="flew-row mb-6 flex justify-between">
          <Label className="text-lg font-semibold text-neutral-700">
            List of announcements
          </Label>
          <div>
            <Button asChild>
              <Link href="/announcements/create">New announcement</Link>
            </Button>
          </div>
        </div>
        <div>
          <AnnouncementList announcements={announcements} />
        </div>
      </div>
    </main>
  );
};

export default AnnouncementPage;
