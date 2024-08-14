import { encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const user = await request.json()

    if(user.username == "jj") {
        const token = await encrypt(user)

        return NextResponse.json({token})
    }else {
        return NextResponse.json({token: null})
    }
}
