import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import serverEnv from "@/utils/serverEnv";

const privateRoutes = ["/dashboard", "/tasks", "/tasks/create"];
const authRoutes = ["/auth/login", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: serverEnv.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;
  if (privateRoutes.some((route) => path.startsWith(route)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }
  if (authRoutes.some((route) => path.startsWith(route)) && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
