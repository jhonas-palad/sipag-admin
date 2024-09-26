import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <div className="max-w-xl flex flex-col justify-center items-center -mt-20">
          <Image
            className="mb-4"
            src="/images/sipag-logo.png"
            alt="sipag-logo"
            width={250}
            height={250}
          />
          <h1 className="font-bold text-green-900 text-center mb-10">
            Welcome to <br />
            SIPAG admin site
          </h1>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">Download the app</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="row-start-2 flex flex-wrap items-center justify-center max-w-md">
        <small className="text-neutral-400 text-center leading-normal">
          This application is developed solely for capstone project purposes and
          is not intended for public use or distribution.
        </small>
      </footer>
    </div>
  );
}
