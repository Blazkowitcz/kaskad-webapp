import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    // const token = req.cookies.get("token");
    // const {pathname} = req.nextUrl;
    //
    // if (!token && !pathname.startsWith("/signin")) {
    //     return NextResponse.next();
    //     //return NextResponse.redirect(new URL("/signin", req.url));
    // } else if (token && pathname.startsWith("/signin")) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }
    //
    // return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|static).*)"],
};