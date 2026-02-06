import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import Zap from "lucide-react/dist/esm/icons/zap";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";

interface OverviewStatsProps {
  totalSavings: number;
  activityCount: number;
  streak: number;
  points?: number;
}

export function OverviewStats({ totalSavings, activityCount, streak, points }: OverviewStatsProps) {
  // Calculate points if not provided: 10 per activity + 5 per kg saved
  const calculatedPoints = points ?? Math.round(activityCount * 10 + totalSavings * 5);

  const stats = [
    {
      title: "Total Emisi Diselamatkan",
      value: `${totalSavings.toFixed(1)} kg`,
      description: "Bulan ini",
      icon: Leaf,
      color: "text-green-500",
    },
    {
      title: "Poin Terkumpul",
      value: calculatedPoints.toLocaleString(),
      description: "Level: Eco Starter", // Placeholder level logic
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Aktivitas Tercatat",
      value: activityCount.toString(),
      description: "Bulan ini",
      icon: Zap,
      color: "text-blue-500",
    },
    {
      title: "Streak Harian",
      value: `${streak} Hari`,
      description: "Pertahankan!",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
