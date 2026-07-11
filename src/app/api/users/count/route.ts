import { db } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await db.collection("user").countDocuments();
        return NextResponse.json({ count });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch user count" }, { status: 500 });
    }
}