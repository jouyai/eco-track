import { auth } from "@/auth";
import { db } from "@/lib/db";
import { activities } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.activities.findMany({
      where: eq(activities.userId, session.user.id),
      orderBy: [desc(activities.date)], // using date based on schema, previous was createdAt but schema says date
      limit: 5,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
