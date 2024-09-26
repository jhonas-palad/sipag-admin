import { CreatePublicAnnouncementForm } from "@/components/announcements/create-public-announcement-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
const CreatePage = () => {
  return (
    <main className="">
      <div className="mx-32 mt-6">
        <div className="mb-6 grid place-items-center">
          <Card className="z-50 w-full cursor-auto border-none shadow-none md:max-w-lg">
            <CardHeader
              id="card-header"
              className="flex flex-row items-start justify-between"
            >
              <div>
                <CardTitle>Create an announcement</CardTitle>
                <CardDescription>
                  This will be posted to the app
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent id="card-content">
              <CreatePublicAnnouncementForm navigateBack='/announcements' />
            </CardContent>
            <CardFooter id="card-footer"></CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreatePage;
