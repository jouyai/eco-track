"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// --- Carbon Calculation Constants (simplified) ---
// Unit: kg CO2e per unit
const CARBON_FACTORS: Record<string, number> = {
  // Transport (per km)
  "car": 0.192,
  "bus": 0.105,
  "train": 0.041,
  "bike": 0,
  
  // Energy
  "electricity": 0.5, // per kWh (approx global avg)
  "gas": 2.0, // per m3
  "lpg": 1.5, // per kg
  
  // Lifestyle (fixed savings per action)
  "recycle_plastic": -0.5, // Saving
  "bring_bag": -0.1,
  "vegan_meal": -1.5, // vs meat meal
  "cold_shower": -0.3,
  "turn_off_lights": -0.1,
};

// --- Schemas ---
const ActivitySchema = z.object({
  type: z.string(),
  name: z.string(),
  value: z.number().min(0),
  unit: z.string(),
});

export async function logActivity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const type = formData.get("type") as string;
  const subType = formData.get("subType") as string; // e.g. "car", "electricity"
  const value = parseFloat(formData.get("value") as string || "1"); // Default 1 for lifestyle actions
  const unit = formData.get("unit") as string || "action";
  const passengers = parseInt(formData.get("passengers") as string || "1");

  // Calculate Carbon Footprint
  // If subType is in factors, use it. Otherwise default to 0.
  // Note: Positive values mean emission, Negative values mean saving (for lifestyle)
  // However, usually we want to track "Impact".
  // For transport/energy: Impact is emission (Bad). But we might want to track "Reduction" if compared to baseline.
  // For this app context:
  // - Transport/Energy = Emission (Positive)
  // - Lifestyle = Saving (Negative value in factor, but we might want to display as "Saved")
  
  let factor = CARBON_FACTORS[subType] || 0;
  let carbonFootprint = value * factor;

  // Apply passenger division for transport
  if (type === "transport" && passengers > 1) {
    carbonFootprint = carbonFootprint / passengers;
  }

  // Store in DB
  await prisma.activity.create({
    data: {
      userId: session.user.id,
      type: type,
      name: subType, // Storing "car", "bus" etc as name for now
      value: value,
      unit: unit,
      carbonFootprint: carbonFootprint,
      passengers: passengers,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/activity");
  revalidatePath("/dashboard/stats");
}

export async function deleteActivity(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const activity = await prisma.activity.findUnique({
    where: { id },
  });

  if (!activity || activity.userId !== session.user.id) {
    throw new Error("Unauthorized or not found");
  }

  await prisma.activity.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/activity");
  revalidatePath("/dashboard/stats");
}

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 1. Total Emissions / Savings (Month)
  // We sum carbonFootprint. 
  // Positive = Emission. Negative = Savings.
  // But the UI shows "Emisi Diselamatkan" (Savings).
  // So we probably want to sum negative values * -1.
  
  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
      date: {
        gte: startOfMonth,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  let totalEmissions = 0;
  let totalSavings = 0;
  
  activities.forEach(act => {
    if (act.carbonFootprint > 0) {
      totalEmissions += act.carbonFootprint;
    } else {
      totalSavings += Math.abs(act.carbonFootprint);
    }
  });

  // 2. Activity Count (Month)
  const activityCount = activities.length;

  // 3. Streak Logic
  // Get distinct dates with activity for this user (all time, not just this month)
  // Optimization: For now just use the fetched activities (month) for simplicity, 
  // or fetch a lightweight list of dates.
  // To be accurate, we need to check past months too for long streaks.
  // Let's fetch just dates for the last 365 days.
  const pastActivities = await prisma.activity.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      date: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  const uniqueDates = Array.from(new Set(pastActivities.map(a => a.date.toISOString().split('T')[0]))).sort().reverse();
  
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Check if streak is active (today or yesterday has activity)
  if (uniqueDates.length > 0) {
      if (uniqueDates[0] === today) {
          streak = 1;
          // Check previous days
          let checkDate = new Date(Date.now() - 86400000);
          while (true) {
              const dateStr = checkDate.toISOString().split('T')[0];
              if (uniqueDates.includes(dateStr)) {
                  streak++;
                  checkDate.setDate(checkDate.getDate() - 1);
              } else {
                  break;
              }
          }
      } else if (uniqueDates[0] === yesterday) {
          streak = 1;
          // Check previous days
          let checkDate = new Date(Date.now() - 86400000 * 2);
          while (true) {
              const dateStr = checkDate.toISOString().split('T')[0];
              if (uniqueDates.includes(dateStr)) {
                  streak++;
                  checkDate.setDate(checkDate.getDate() - 1);
              } else {
                  break;
              }
          }
      }
  }

  // 4. Recent Activities (Limit 5)
  const recentActivities = activities.slice(0, 5);

  // 5. User Points
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { points: true }
  });

  // 6. Active Challenge
  const activeChallenge = await prisma.userChallenge.findFirst({
      where: {
          userId: userId,
          status: "ACTIVE"
      },
      include: {
          challenge: true
      },
      orderBy: {
          lastUpdated: 'desc'
      }
  });

  // 7. Daily Tip
  const TIPS = [
      "Membawa botol minum sendiri dapat menghemat hingga 156 botol plastik per tahun.",
      "Matikan lampu saat meninggalkan ruangan untuk menghemat energi.",
      "Gunakan transportasi umum setidaknya sekali seminggu untuk mengurangi jejak karbon.",
      "Daur ulang sampah elektronik Anda di tempat yang disediakan.",
      "Kurangi penggunaan kertas dengan beralih ke tagihan digital.",
      "Beli produk lokal untuk mengurangi emisi transportasi pengiriman.",
      "Cabut charger hp jika tidak digunakan untuk menghindari vampir listrik."
  ];
  // Simple random tip based on day of year to keep it consistent for the day
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const dailyTip = TIPS[dayOfYear % TIPS.length];

  // 8. Leaderboard Rank
  const leaderboardRank = await prisma.user.count({
      where: {
          points: {
              gt: user?.points || 0
          }
      }
  }) + 1;

  // 9. Weekly Data (Last 7 days) for Chart
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 6);
  startOfWeek.setHours(0,0,0,0);
  
  const weeklyActivities = await prisma.activity.findMany({
      where: {
          userId: userId,
          date: { gte: startOfWeek }
      }
  });
  
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const weeklyData = [];
  
  for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      const dayName = days[d.getDay()];
      
      const dayEmissions = weeklyActivities
        .filter(a => {
            const aDate = new Date(a.date);
            return aDate.getDate() === d.getDate() && aDate.getMonth() === d.getMonth();
        })
        .reduce((sum, a) => sum + (a.carbonFootprint > 0 ? a.carbonFootprint : 0), 0);
        
      weeklyData.push({ day: dayName, emissions: Math.round(dayEmissions * 10) / 10 });
  }

  return {
    totalEmissions,
    totalSavings,
    activityCount,
    streak,
    recentActivities,
    points: user?.points || 0,
    activeChallenge,
    dailyTip,
    leaderboardRank,
    weeklyData
  };
}

export async function getAllActivities() {
    const session = await auth();
    if (!session?.user?.id) return [];

    return await prisma.activity.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
    });
}

export async function getRecentActivities(limit: number = 5) {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.activity.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: limit,
  });
}

export async function getStatsPageData() {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  const userId = session.user.id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
      date: {
        gte: startOfMonth,
      },
    },
  });

  let totalEmissions = 0;
  activities.forEach(a => {
      if (a.carbonFootprint > 0) totalEmissions += a.carbonFootprint;
  });

  // Category Breakdown
  const categoryMap = new Map<string, number>();
  activities.forEach(a => {
      if (a.carbonFootprint > 0) {
        const current = categoryMap.get(a.type) || 0;
        categoryMap.set(a.type, current + a.carbonFootprint);
      }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name: name === 'transport' ? 'Transportasi' : (name === 'energy' ? 'Energi' : 'Lainnya'),
      value: Math.round(value * 10) / 10,
      percentage: totalEmissions > 0 ? Math.round((value / totalEmissions) * 100) : 0
  })).sort((a, b) => b.value - a.value);

  // Weekly Data (Last 7 days)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 6);
  startOfWeek.setHours(0,0,0,0);
  
  const weeklyActivities = await prisma.activity.findMany({
      where: {
          userId: userId,
          date: { gte: startOfWeek }
      }
  });
  
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const weeklyData = [];
  
  for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      const dayName = days[d.getDay()];
      
      const dayEmissions = weeklyActivities
        .filter(a => {
            const aDate = new Date(a.date);
            return aDate.getDate() === d.getDate() && aDate.getMonth() === d.getMonth();
        })
        .reduce((sum, a) => sum + (a.carbonFootprint > 0 ? a.carbonFootprint : 0), 0);
        
      weeklyData.push({ day: dayName, emissions: Math.round(dayEmissions * 10) / 10 });
  }

  // User Points & Rank
  const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
  });

  const leaderboardRank = await prisma.user.count({
      where: {
          points: {
              gt: user?.points || 0
          }
      }
  }) + 1;

  return {
      totalEmissions: Math.round(totalEmissions * 10) / 10,
      categories,
      weeklyData,
      points: user?.points || 0,
      leaderboardRank
  };
}
