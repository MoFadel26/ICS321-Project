// made and maintained by Omar Aljohani

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const adminRoutes = ["/admin/passanger", "/admin/train", "/admin/reservation"];
const passengerRoutes = ["/passenger"];
const publicRoutes = ["/login"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = adminRoutes.includes(path);
  const isPassengerRoute = passengerRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isAdminRoute && (!session || !session.isAdmin)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (isPassengerRoute && (!session || session?.isAdmin)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.email) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
};
