import { auth } from "@/auth";
import { db } from "@/lib/db";
import { activities, users } from "@/lib/db/schema";
import { eq, and, gte, desc, gt, count } from "drizzle-orm";
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

    const activitiesData = await db.query.activities.findMany({
      where: and(
        eq(activities.userId, userId),
        gte(activities.date, startOfMonth)
      ),
    });

    let totalEmissions = 0;
    activitiesData.forEach(a => {
        if (a.carbonFootprint > 0) totalEmissions += a.carbonFootprint;
    });

    // Category Breakdown
    const categoryMap = new Map<string, number>();
    activitiesData.forEach(a => {
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
    
    const weeklyActivities = await db.query.activities.findMany({
        where: and(
            eq(activities.userId, userId),
            gte(activities.date, startOfWeek)
        )
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
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { points: true }
    });

    const [rankResult] = await db.select({ count: count() }).from(users).where(gt(users.points, user?.points || 0));
    const leaderboardRank = rankResult.count + 1;

    return NextResponse.json({
      totalEmissions: Math.round(totalEmissions * 10) / 10,
      categories,
      weeklyData,
      points: user?.points || 0,
      leaderboardRank
    });

  } catch (error) {
    console.error("Error fetching detailed stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
