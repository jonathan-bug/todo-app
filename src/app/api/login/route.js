import { encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request) {
    try {
        const user = await request.json();
        const client = await pool.connect();
        const { rows } = (await client.query("SELECT * FROM todo_user"));

        if(rows[0].username = user.username && await bcrypt.compare(user.password, rows[0].password)) {
            const token = await encrypt(user)
            return NextResponse.json({token});
        }else {
            return NextResponse.json({token: null});
        }
    }catch {
        return NextResponse.json({token: null});
    }
}
