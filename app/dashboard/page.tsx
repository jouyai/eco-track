import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ImpactChart } from "@/components/dashboard/ImpactChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { getDashboardStats } from "@/lib/actions/activity";

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Halo, {session?.user?.name || "Eco Warrior"}! 👋</h2>
        <p className="text-muted-foreground">
          Berikut adalah ringkasan dampak lingkungan Anda hari ini.
        </p>
      </div>

      <OverviewStats 
        totalSavings={stats?.totalSavings || 0}
        activityCount={stats?.activityCount || 0}
        streak={stats?.streak || 0}
        points={stats?.points || 0}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity activities={stats?.recentActivities || []} />
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
           <CardHeader>
             <CardTitle>Dampak Mingguan</CardTitle>
             <CardDescription>Visualisasi emisi karbon Anda 7 hari terakhir.</CardDescription>
           </CardHeader>
           <CardContent className="pl-2">
              <ImpactChart data={stats?.weeklyData || []} />
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Tantangan Aktif</CardTitle>
            <CardDescription>
                {stats?.activeChallenge ? "Lanjutkan progres Anda!" : "Belum ada tantangan aktif."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.activeChallenge ? (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate mr-2">{stats.activeChallenge.challenge.title}</span>
                    <span className="font-bold text-primary whitespace-nowrap">
                        {stats.activeChallenge.progress}/{stats.activeChallenge.challenge.target}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${Math.min(100, Math.round((stats.activeChallenge.progress / stats.activeChallenge.challenge.target) * 100))}%` }} 
                    />
                  </div>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground mb-4">
                    Pilih tantangan baru untuk mendapatkan poin lebih banyak!
                </p>
            )}
            <Button className="w-full" asChild>
              <Link href="/dashboard/challenges">
                {stats?.activeChallenge ? "Lihat Detail" : "Cari Tantangan"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Komunitas</CardTitle>
            <CardDescription>Lihat pencapaian teman-teman Anda.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">
               Anda berada di peringkat <span className="font-bold text-primary">#{stats?.leaderboardRank || "-"}</span> minggu ini. Ajak teman untuk bersaing!
             </p>
             <Button variant="outline" className="w-full">
               Lihat Leaderboard
             </Button>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle>Tips Harian</CardTitle>
             <CardDescription>Saran untuk gaya hidup lebih hijau.</CardDescription>
           </CardHeader>
           <CardContent>
             <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
               "{stats?.dailyTip || "Jaga bumi, jaga masa depan."}"
             </blockquote>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
