import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES, AUTH_ENDPOINTS, HOME_ROUTE } from "./lib/routes";
import { verifyToken } from "@/lib/server/auth";
import { Session } from "next-auth";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth(async (req: NextAuthRequest) => {
  const currentRoute = req.nextUrl.pathname;
  const authUser = req.auth;
  const validToken = await verifyToken((authUser as Session)?.token);

  if (PRIVATE_ROUTES.includes(currentRoute) && !validToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  // if (!validToken) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }
  if (validToken && AUTH_ENDPOINTS.includes(currentRoute)) {
    return NextResponse.redirect(new URL(HOME_ROUTE, req.url));
  }

  return NextResponse.next();
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // "/(api|trpc)(.*)",
  ],
};
