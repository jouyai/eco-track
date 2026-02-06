import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Fetch activities for this month
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
    // Fetch dates for last 365 days for streak calculation
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

    const uniqueDates = Array.from(new Set(pastActivities.map(a => new Date(a.date).toISOString().split('T')[0]))).sort().reverse();
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (uniqueDates.length > 0) {
        if (uniqueDates[0] === today) {
            streak = 1;
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

    // 4. Recent Activities (from this month, matching original logic)
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

    // 9. Weekly Data (Last 7 days)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 6);
    startOfWeek.setHours(0,0,0,0);
    
    // We need to fetch specific weekly activities because 'activities' (this month) might not cover last 7 days if month just started?
    // Actually, startOfMonth might be later than startOfWeek if today is 1st-6th of month.
    // So we should query safely.
    
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

    return NextResponse.json({
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
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
