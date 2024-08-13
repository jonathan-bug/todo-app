import { encrypt, decrypt } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request) {
    const user = await request.json()

    if(user.username == "jj") {
        const token = await encrypt(user)

        return NextResponse.json({token})
    }else {
        return NextResponse.json({token: null})
    }
}

