"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CreatePublicAnnouncementForm } from "@/components/announcements/create-public-announcement-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
const Page = () => {
  const router = useRouter();
  return (
    <div
      role="modal-backdrop"
      onClick={(e) => {
        if (
          (e.target as HTMLElement).getAttribute("role") !== "modal-backdrop"
        ) {
          return;
        }
        router.back();
      }}
      className="fixed inset-0 z-10 grid h-screen w-screen cursor-pointer place-items-center bg-gray-900 bg-opacity-50"
    >
      <Card className="z-50 w-full cursor-auto md:max-w-lg">
        <CardHeader
          id="card-header"
          className="flex flex-row items-start justify-between"
        >
          <div>
            <CardTitle>Create an announcement</CardTitle>
            <CardDescription>This will be posted to the app</CardDescription>
          </div>
          <Button
            onClick={() => {
              router.back();
            }}
            variant="ghost"
            size="icon"
          >
            <Cross2Icon />
          </Button>
        </CardHeader>
        <CardContent id="card-content">
          <CreatePublicAnnouncementForm />
        </CardContent>
        <CardFooter id="card-footer"></CardFooter>
      </Card>
    </div>
  );
};

export default Page;
