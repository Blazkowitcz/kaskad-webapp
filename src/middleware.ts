import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const {pathname} = req.nextUrl;

    // autorise login sans token
    if (!token && !pathname.startsWith("/signin")) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // si déjà connecté et tente d’aller sur /login
    if (token && pathname.startsWith("/signin")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|static).*)"],
};