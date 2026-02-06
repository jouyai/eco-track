import { auth } from "@/auth";
import { db } from "@/lib/db";
import { userChallenges } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { challengeId } = (await req.json()) as { challengeId: string };

    if (!challengeId) {
        return NextResponse.json({ error: "Challenge ID required" }, { status: 400 });
    }

    // Check if already joined
    const existing = await db.query.userChallenges.findFirst({
      where: and(
        eq(userChallenges.userId, session.user.id),
        eq(userChallenges.challengeId, challengeId)
      )
    });

    if (existing) {
        return NextResponse.json({ error: "Already joined" }, { status: 400 });
    }

    await db.insert(userChallenges).values({
        userId: session.user.id,
        challengeId,
        progress: 0,
        status: "ACTIVE",
        startDate: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error joining challenge:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
