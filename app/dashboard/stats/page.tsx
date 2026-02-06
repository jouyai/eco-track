"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Trophy } from "lucide-react";
import { ImpactChart } from "@/components/dashboard/ImpactChart";

interface Category {
  name: string;
  value: number;
  percentage: number;
}

export default function StatsPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/dashboard/detailed-stats")
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          setStats(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading && session?.user) {
    return <div className="p-6 text-center text-muted-foreground">Memuat statistik...</div>;
  }

  const weeklyData = stats?.weeklyData || [];
  const categories: Category[] = stats?.categories || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Statistik Dampak</h2>
        <p className="text-muted-foreground">
          Analisis mendalam tentang jejak karbon dan kontribusi lingkungan Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emisi Bulan Ini</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEmissions || 0} kg CO2e</div>
            <p className="text-xs text-muted-foreground">Berdasarkan aktivitas tercatat</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peringkat Komunitas</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{stats?.leaderboardRank || "-"}</div>
            <p className="text-xs text-muted-foreground">Dari seluruh pengguna aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Poin</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.points || 0} Poin</div>
            <p className="text-xs text-muted-foreground">Kumpulkan lebih banyak dari tantangan!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Emissions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emisi Minggu Ini</CardTitle>
            <CardDescription>Jejak karbon harian Anda dalam kg CO2e.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ImpactChart data={weeklyData} />
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Berdasarkan Kategori</CardTitle>
            <CardDescription>Sumber utama jejak karbon Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {categories.length > 0 ? (
                categories.map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-2 font-medium">
                                <div className={`w-3 h-3 rounded-full ${cat.name === 'Transportasi' ? 'bg-blue-500' : (cat.name === 'Energi' ? 'bg-yellow-500' : 'bg-green-500')}`} /> 
                                {cat.name}
                            </span>
                            <span className="text-muted-foreground">{cat.value} kg ({cat.percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${cat.name === 'Transportasi' ? 'bg-blue-500' : (cat.name === 'Energi' ? 'bg-yellow-500' : 'bg-green-500')}`} 
                                style={{ width: `${cat.percentage}%` }}
                            />
                        </div>
                    </div>
                ))
              ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                      Belum ada data aktivitas untuk dianalisis.
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
