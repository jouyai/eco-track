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

    // Check if already joined
    const existing = await prisma.userChallenge.findUnique({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId,
        },
      },
    });

    if (existing) {
        return NextResponse.json({ error: "Already joined" }, { status: 400 });
    }

    await prisma.userChallenge.create({
      data: {
        userId: session.user.id,
        challengeId,
        progress: 0,
        status: "ACTIVE",
        startDate: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error joining challenge:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
