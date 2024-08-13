import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM tasks");
        
        client.release();

        return NextResponse.json(rows);
    }catch {
        return NextResponse.json({err: 1});
    }
}

export async function POST(request) {
    try {
        const values = await request.json();
        const client = await pool.connect();
        const { rows } = await client.query(
            `INSERT INTO tasks(title, priority, until, repeat) VALUES('${values.title}', '${values.priority}', '${values.until}', ${values.repeat}) RETURNING id`);

        client.release();
        
        return NextResponse.json({id: rows[0].id});
    }catch (err){
        return NextResponse.json({err: 1});
    }
}

export async function PUT(request) {
    try {
        const values = await request.json();
        const client = await pool.connect();

        await client.query(`UPDATE tasks SET title='${values.title}', priority='${values.priority}', until='{${values.until}}', repeat=${values.repeat} WHERE id=${values.id}`);

        client.release();
        return NextResponse.json({});
    }catch {
        return NextResponse.json({err: 1});
    }
}
