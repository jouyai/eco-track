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

    const userChallenge = await db.query.userChallenges.findFirst({
      where: and(
        eq(userChallenges.userId, session.user.id),
        eq(userChallenges.challengeId, challengeId)
      ),
      with: {
        challenge: true,
      },
    });

    if (!userChallenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    const newProgress = (userChallenge.progress || 0) + 1;
    let status = userChallenge.status || "ACTIVE";
    let completed = false;

    if (newProgress >= userChallenge.challenge.target) {
      status = "COMPLETED";
      completed = true;
      // Add points
      // (Simplified: assuming points logic exists here or we just mark complete)
    }

    await db.update(userChallenges)
      .set({
        progress: newProgress,
        status: status,
        lastUpdated: new Date(),
      })
      .where(eq(userChallenges.id, userChallenge.id));

    return NextResponse.json({ success: true, completed });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
