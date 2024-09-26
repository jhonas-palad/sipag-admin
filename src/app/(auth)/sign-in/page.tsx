import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SigninForm } from "./SigninForm";
const SignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="w-full max-w-xl">
        <Button variant="outline" asChild className="gap-1">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </div>
      <main className="w-full max-w-md">
        <header className="text-center mb-8">
          <h2>Welcome admin</h2>
          <p>Login to the dashboard</p>
        </header>
        <SigninForm />
      </main>
      {/* <footer>Footer</footer> */}
    </div>
  );
};

export default SignInPage;
