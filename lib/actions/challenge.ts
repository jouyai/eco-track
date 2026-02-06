"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

export async function getChallenges() {
  const session = await auth();
  if (!session?.user?.id) return { active: [], available: [] };

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

  return {
    active: activeChallenges,
    available: availableChallenges
  };
}

export async function joinChallenge(challengeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Check if already active
  const existing = await prisma.userChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId,
        challengeId
      }
    }
  });

  if (existing && existing.status === "ACTIVE") {
    throw new Error("Already joined this challenge");
  }

  // If exists but not active (e.g. failed/completed), maybe reset? 
  // For now, let's assume we create new or update existing to ACTIVE
  if (existing) {
    await prisma.userChallenge.update({
      where: { id: existing.id },
      data: {
        status: "ACTIVE",
        progress: 0,
        startDate: new Date(),
        endDate: null // Logic for end date can be added
      }
    });
  } else {
    await prisma.userChallenge.create({
      data: {
        userId,
        challengeId,
        status: "ACTIVE",
        startDate: new Date()
      }
    });
  }

  revalidatePath("/dashboard/challenges");
}

export async function updateChallengeProgress(challengeId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const userId = session.user.id;

    const userChallenge = await prisma.userChallenge.findFirst({
        where: {
            userId: userId,
            challengeId: challengeId,
            status: "ACTIVE"
        },
        include: {
            challenge: true
        }
    });

    if (!userChallenge) throw new Error("Challenge not found or not active");

    // 1. Abuse Prevention: Check time-based restriction
    // If challenge unit is "hari" (days), ensure last update wasn't today
    const now = new Date();
    const lastUpdated = userChallenge.lastUpdated;
    const isDailyChallenge = userChallenge.challenge.unit.toLowerCase() === "hari";

    if (isDailyChallenge && lastUpdated) {
        const isSameDay = 
            lastUpdated.getDate() === now.getDate() &&
            lastUpdated.getMonth() === now.getMonth() &&
            lastUpdated.getFullYear() === now.getFullYear();
        
        if (isSameDay) {
            throw new Error("Tantangan harian hanya bisa diupdate sekali sehari!");
        }
    }

    const newProgress = userChallenge.progress + 1;
    const isCompleted = newProgress >= userChallenge.challenge.target;

    // 2. Transaction to update progress and potentially add points
    await prisma.$transaction(async (tx) => {
        // Update Challenge Progress
        await tx.userChallenge.update({
            where: { id: userChallenge.id },
            data: {
                progress: newProgress,
                status: isCompleted ? "COMPLETED" : "ACTIVE",
                lastUpdated: now,
                endDate: isCompleted ? now : null
            }
        });

        // Add Points if Completed
        if (isCompleted) {
            // Extract numeric points from string "100 Poin" -> 100
            const pointsString = userChallenge.challenge.reward;
            const points = parseInt(pointsString.replace(/\D/g, '')) || 0;

            if (points > 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        points: {
                            increment: points
                        }
                    }
                });
            }
        }
    });
    
    revalidatePath("/dashboard/challenges");
    return isCompleted;
}
