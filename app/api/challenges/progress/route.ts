import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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

    const userChallenge = await prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId,
        },
      },
      include: {
        challenge: true,
      },
    });

    if (!userChallenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    const newProgress = userChallenge.progress + 1;
    let status = userChallenge.status;
    let completed = false;

    if (newProgress >= userChallenge.challenge.target) {
      status = "COMPLETED";
      completed = true;
      // Add points
      // (Simplified: assuming points logic exists here or we just mark complete)
    }

    await prisma.userChallenge.update({
      where: { id: userChallenge.id },
      data: {
        progress: newProgress,
        status: status,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json({ success: true, completed });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
