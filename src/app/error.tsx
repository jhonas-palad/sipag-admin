"use client";
import React, { useEffect } from "react";
import { CenteredFullContainer } from "@/components/centered-full-container";
import { Button } from "@/components/ui/button";
const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <CenteredFullContainer>
      <div className="flex flex-col gap-4">
        An error occured. Details - {error.digest}
        <Button onClick={reset}>Retry</Button>
      </div>
    </CenteredFullContainer>
  );
};

export default ErrorPage;
