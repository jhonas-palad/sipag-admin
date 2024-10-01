import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getPublicAnnouncement } from "@/lib/server/announcements";
import { DetailField } from "@/components/detail-field";
import React from "react";
import { Label } from "@/components/ui/label";
import { DeleteAnnouncementButton } from "@/components/announcements/delete-announcement";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [k: string]: string };
}
const AnnouncementDetailPage = async ({ params: { id } }: Props) => {
  const data = await getPublicAnnouncement(id);
  console.log(data);
  if (!data) {
    return <div>{id} not found</div>;
  }
  return (
    <main className="">
      <div className="mx-32 mt-6">
        <div className="flew-row mb-6 flex justify-between">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Announcement Details</CardTitle>
              <CardDescription>Ths is a read only details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailField
                label="Title"
                value={data?.title}
                placeholder="No title"
              />
              <div>
                <Label className="text-lg font-bold">Description</Label>
                <Textarea
                  rows={5}
                  value={data?.description}
                  disabled
                  placeholder={"No description"}
                />
              </div>
            </CardContent>
            <CardFooter>
              <DeleteAnnouncementButton id={data.id} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default AnnouncementDetailPage;
