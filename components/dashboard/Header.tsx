"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Bell from "lucide-react/dist/esm/icons/bell";
import Car from "lucide-react/dist/esm/icons/car";
import Zap from "lucide-react/dist/esm/icons/zap";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import Bus from "lucide-react/dist/esm/icons/bus";
import Bike from "lucide-react/dist/esm/icons/bike";
import Train from "lucide-react/dist/esm/icons/train";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export function Header() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Activity[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/activities/recent")
        .then((res) => {
          if (res.ok) return res.json();
          return [];
        })
        .then((data) => {
          if (Array.isArray(data)) {
             setNotifications(data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [session]);

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

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              )}
              <span className="sr-only">Notifikasi</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Aktivitas Terbaru</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Tidak ada notifikasi baru
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((activity) => {
                  const Icon = getIcon(activity.type, activity.name);
                  return (
                    <DropdownMenuItem key={activity.id} className="flex items-start gap-3 p-3 cursor-pointer">
                      <div className={`mt-0.5 rounded-full p-1.5 ${
                        activity.type === 'transport' ? 'bg-blue-100 text-blue-600' : 
                        (activity.type === 'energy' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600')
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">
                          {activity.name.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.value} {activity.unit} • {formatDistanceToNow(new Date(activity.date), { addSuffix: true, locale: id })}
                        </p>
                        <p className={`text-xs font-medium ${activity.carbonFootprint > 0 ? 'text-red-600' : 'text-green-600'}`}>
                           {activity.carbonFootprint > 0 ? '+' : ''}{activity.carbonFootprint.toFixed(2)} kg CO2e
                        </p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-center text-center text-primary font-medium">
              <Link href="/dashboard/activity">
                Lihat Semua Aktivitas
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
