"use client";
import { useDeleteAnnouncement } from "@/hooks/mutations/use-delete-announcement";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
const DeleteAnnouncementButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { mutate } = useDeleteAnnouncement(id, {
    onSettled(data, error) {
      if (error) {
        toast({
          variant: "destructive",
          title: "An error occured",
          description:
            error.status === 404
              ? "User details not found"
              : "Something went wrong in server side.",
        });
      }
      if (data) {
        toast({
          variant: "success",
          title: "Success",
          description: "Announcement has been deleted.",
        });
      }
      setDialogOpen(false);
      router.prefetch("/announcements");
      router.replace("/announcements");
    },
  });
  const handleDelete = useCallback(() => {
    mutate(id);
  }, [mutate, id]);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className={className}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            announcement&apos;s data
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteAnnouncementButton };
