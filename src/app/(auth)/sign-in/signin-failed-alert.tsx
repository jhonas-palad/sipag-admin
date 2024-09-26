import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SigninFailedAlert({ description }: { description: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Signin Failed</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
