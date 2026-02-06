import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Recycle, Lightbulb, Car, Bike, Train, Leaf, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface ActivityItem {
  id: string;
  type: string;
  name: string;
  value: number;
  unit: string;
  carbonFootprint: number;
  passengers?: number | null;
  date: string | Date;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  
  const getIcon = (type: string, name: string) => {
    const lowerName = name.toLowerCase();
    if (type === "transport") {
      if (lowerName.includes("car") || lowerName.includes("mobil")) return Car;
      if (lowerName.includes("bike") || lowerName.includes("motor") || lowerName.includes("sepeda")) return Bike;
      if (lowerName.includes("train") || lowerName.includes("kereta")) return Train;
      return Bus;
    }
    if (type === "energy") return Zap;
    return Leaf;
  };

  const formatImpact = (val: number) => {
    // If val > 0, it's emission (Red). If val < 0, it's saving (Green).
    // But usually in this context we display impact.
    // Let's assume negative is good (saving).
    if (val < 0) return `${Math.abs(val).toFixed(2)} kg Saved`;
    return `${val.toFixed(2)} kg CO2`;
  };

  const getColor = (val: number) => {
    if (val < 0) return "text-green-600";
    return "text-red-600";
  };

  if (activities.length === 0) {
    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Aktivitas Terakhir</CardTitle>
          <CardDescription>Belum ada aktivitas tercatat.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Mulai catat aktivitas Anda untuk melihat riwayat di sini.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Aktivitas Terakhir</CardTitle>
        <CardDescription>
          Riwayat aktivitas ramah lingkungan Anda baru-baru ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type, activity.name);
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none capitalize">
                      {activity.name.replace(/_/g, " ")}
                    </p>
                    <div className="flex flex-wrap gap-1 text-xs text-muted-foreground mt-1">
                      <span>{formatDistanceToNow(new Date(activity.date), { addSuffix: true, locale: id })}</span>
                      <span>•</span>
                      <span>{activity.value} {activity.unit}</span>
                      {activity.passengers && activity.passengers > 1 && (
                        <>
                          <span>•</span>
                          <span>{activity.passengers} Penumpang</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-normal capitalize hidden sm:inline-flex">
                    {activity.type}
                  </Badge>
                  <span className={`text-sm font-medium ${getColor(activity.carbonFootprint)}`}>
                    {formatImpact(activity.carbonFootprint)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
