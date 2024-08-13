import { NextResponse } from "next/server";
import { decrypt, encrypt } from "@/lib/auth";
import { headers } from "next/headers";

// this is for server side auth, middlewares works on the server side :(
// protecting api
export async function middleware(req) {
    try {
        const token = headers().get("authorization").split(" ")[1]
        await decrypt(token)

        return NextResponse.rewrite(new URL(req.url))
    }catch(err) {
        console.log(err.message)
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: "/api/tasks/:path*"
}
