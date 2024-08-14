import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { encrypt, decrypt } from "@/lib/auth";

export async function POST() {
    try {
        const token = headers().get("authorization").split(" ")[1]
        const jwt = await decrypt(token)

        if(jwt.exp > Date.now()) {
            return NextResponse.json({token: null})
        }else {
            return NextResponse.json({token: await encrypt(jwt)})
        }
    }catch (err){
        return NextResponse.json({token: null})
    }
}
