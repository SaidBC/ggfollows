import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import serverEnv from "@/utils/serverEnv";

// Define the critical paths
const ONBOARDING_ROUTE = "/onboarding";
const DASHBOARD_ROUTE = "/dashboard";
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];
const ADMIN_ROUTES = ["/admin/users", "/admin/orders", "/admin/overview"];
const PRIVATE_ROUTES = [
  DASHBOARD_ROUTE,
  "/tasks",
  "/tasks/create",
  "/settings",
  "/verify-email",
  ONBOARDING_ROUTE,
];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: serverEnv.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;
  const isAuthenticated = !!token;
  const isProfileComplete = isAuthenticated && !!token?.username;
  // --- 1. UNAUTHENTICATED USERS: Protect Private Routes ---
  // If accessing a private route and NO token exists, redirect to login.
  if (
    PRIVATE_ROUTES.some((route) => path.startsWith(route)) &&
    !isAuthenticated
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  // --- 2. AUTHENTICATED USERS: Enforce Onboarding & Redirect from Auth Pages ---

  // A. Incomplete Profile Check (Onboarding Jail)
  // If the user is authenticated BUT the profile is incomplete (missing username)
  // AND they are trying to access any route other than the onboarding route,
  // REDIRECT them to the onboarding page.
  if (isAuthenticated && !isProfileComplete && path !== ONBOARDING_ROUTE) {
    const url = req.nextUrl.clone();
    url.pathname = ONBOARDING_ROUTE;
    return NextResponse.redirect(url);
  }

  // B. Redirect from Auth Pages (If Logged In)
  // If the user is authenticated AND the profile is complete,
  // AND they are trying to access an Auth route (login/signup),
  // REDIRECT them to the dashboard.
  if (
    isProfileComplete &&
    AUTH_ROUTES.some((route) => path.startsWith(route))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD_ROUTE;
    return NextResponse.redirect(url);
  }

  // C. Block /onboarding if profile is complete
  // If the user is fully onboarded and tries to access the onboarding page,
  // redirect them away.
  if (isProfileComplete && path === ONBOARDING_ROUTE) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD_ROUTE;
    return NextResponse.redirect(url);
  }

  // --- 3. ADMIN ROUTES: Protect Admin Routes ---
  // If accessing an admin route and the user is not an admin, redirect to dashboard.
  if (
    ADMIN_ROUTES.some((route) => path.startsWith(route)) &&
    token?.role !== "ADMIN"
  ) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD_ROUTE;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/settings/:path*",
    "/verify-email",
    "/onboarding",
    "/auth/login",
    "/auth/signup",
    "/admin/:path*",
  ],
};
