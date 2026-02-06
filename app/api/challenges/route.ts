import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = 'edge';

const INITIAL_CHALLENGES = [
  {
    title: "Bebas Plastik 3 Hari",
    description: "Hindari penggunaan plastik sekali pakai selama 3 hari berturut-turut.",
    type: "lifestyle",
    target: 3,
    unit: "hari",
    duration: 3,
    reward: "50 Poin",
    difficulty: "Easy"
  },
  {
    title: "Hemat Energi Mingguan",
    description: "Kurangi penggunaan listrik atau matikan lampu yang tidak perlu selama seminggu.",
    type: "energy",
    target: 7,
    unit: "hari",
    duration: 7,
    reward: "100 Poin",
    difficulty: "Medium"
  },
  {
    title: "Bike to Work",
    description: "Bersepeda ke tempat kerja atau sekolah setidaknya 2 kali minggu ini.",
    type: "transport",
    target: 2,
    unit: "kali",
    duration: 7,
    reward: "150 Poin",
    difficulty: "Medium"
  },
  {
    title: "Vegan Challenge",
    description: "Makan makanan berbasis nabati seharian penuh.",
    type: "lifestyle",
    target: 1,
    unit: "hari",
    duration: 1,
    reward: "200 Poin",
    difficulty: "Hard"
  },
  {
    title: "Zero Waste Shopping",
    description: "Belanja kebutuhan bulanan tanpa kemasan plastik.",
    type: "lifestyle",
    target: 1,
    unit: "kali",
    duration: 1,
    reward: "120 Poin",
    difficulty: "Medium"
  }
];

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. Check if challenges exist, if not seed them
    const count = await prisma.challenge.count();
    if (count === 0) {
      await prisma.challenge.createMany({
        data: INITIAL_CHALLENGES
      });
    }

    // 2. Get User's Active Challenges
    const activeChallenges = await prisma.userChallenge.findMany({
      where: {
        userId: userId,
        status: "ACTIVE"
      },
      include: {
        challenge: true
      }
    });

    // 3. Get Available Challenges (exclude active ones)
    const activeChallengeIds = activeChallenges.map(uc => uc.challengeId);
    const availableChallenges = await prisma.challenge.findMany({
      where: {
        id: {
          notIn: activeChallengeIds.length > 0 ? activeChallengeIds : [""]
        }
      }
    });

    return NextResponse.json({
      active: activeChallenges,
      available: availableChallenges
    });

  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
