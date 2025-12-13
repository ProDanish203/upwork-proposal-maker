import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/signup"];
  const privatePaths = ["/", "/profile"];
  const isPublicPath = publicPaths.includes(path);
  const isPrivatePath = privatePaths.includes(path);

  const token = request.cookies.get("token")?.value || "";
  const onboarded = request.cookies.get("onboarded")?.value || "false";

  if (isPrivatePath && token) {
    if (onboarded === "false")
      return NextResponse.redirect(new URL("/onboarding", request.nextUrl));
    else return NextResponse.next();
  }

  if (isPublicPath && token) {
    if (onboarded === "false")
      return NextResponse.redirect(new URL("/onboarding", request.nextUrl));
    else return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
}

export const config = {
  matcher: ["/", "/login", "/signup", "/onboarding", "/profile"],
};
