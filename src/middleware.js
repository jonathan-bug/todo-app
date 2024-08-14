import { NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";
import { headers } from "next/headers";

// this is for server side auth, middlewares works on the server side :(
// API auth
export async function middleware(req) {
    // try to decrypt the token
    try {
        const token = headers().get("authorization").split(" ")[1];
        // decrypt the token
        await decrypt(token);

        // if the token can be decrypted then continue with the request
        return NextResponse.rewrite(new URL(req.url));
    }catch(err) {
        // if cant decrypt the token then return an error 
        return NextResponse.json({error: ""},{status: 404});
    }
}

export const config = {
    matcher: ["/api/tasks/:path*", "/api/tasks/[id]"]
}
