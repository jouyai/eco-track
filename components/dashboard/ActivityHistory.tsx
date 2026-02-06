"use client";

import { useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import Car from "lucide-react/dist/esm/icons/car";
import Bike from "lucide-react/dist/esm/icons/bike";
import Train from "lucide-react/dist/esm/icons/train";
import Bus from "lucide-react/dist/esm/icons/bus";
import Zap from "lucide-react/dist/esm/icons/zap";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Activity {
  id: string;
  type: string;
  name: string;
  value: number;
  unit: string;
  carbonFootprint: number;
  passengers?: number | null;
  date: string | Date;
}

interface ActivityHistoryProps {
  activities: Activity[];
}

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (activityId: string) => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/activities?id=${activityId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed");
        
        toast.success("Aktivitas berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus aktivitas");
      }
    });
  };

  const getIcon = (type: string, name: string) => {
    const lowerName = name.toLowerCase();
    if (type === "transport") {
      if (lowerName.includes("car") || lowerName.includes("mobil")) return Car;
      if (lowerName.includes("bike") || lowerName.includes("motor")) return Bike;
      if (lowerName.includes("train") || lowerName.includes("kereta")) return Train;
      return Bus;
    }
    if (type === "energy") return Zap;
    return Leaf;
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Aktivitas</CardTitle>
          <CardDescription>Belum ada aktivitas yang tercatat.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Aktivitas</CardTitle>
        <CardDescription>Daftar semua aktivitas yang telah Anda catat.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type, activity.name);
            return (
              <div
                key={activity.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium capitalize leading-none">
                      {activity.name === 'transport' ? 'Transportasi' : activity.name.replace(/_/g, " ")}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span>{format(new Date(activity.date), "dd MMMM yyyy, HH:mm", { locale: id })}</span>
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

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={activity.carbonFootprint > 0 ? "default" : "secondary"} className={activity.carbonFootprint > 0 ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-green-100 text-green-700 hover:bg-green-100"}>
                      {activity.carbonFootprint > 0 ? "+" : ""}{activity.carbonFootprint.toFixed(2)} kg CO2e
                    </Badge>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isPending}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Aktivitas?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Data aktivitas ini akan dihapus permanen dari riwayat Anda.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(activity.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
