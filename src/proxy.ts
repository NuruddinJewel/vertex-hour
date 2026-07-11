import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    const protectedRoutes = ["/items/add", "/items/manage", "/dashboard", "/profile"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/items/add", "/items/manage/:path*", "/dashboard/:path*", "/profile"],
};