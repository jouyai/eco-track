"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ActivityLogger } from "@/components/dashboard/ActivityLogger";
import { ActivityHistory } from "@/components/dashboard/ActivityHistory";

export default function ActivityPage() {
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

  const { data: session } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/activities")
        .then((res) => {
          if (res.ok) return res.json();
          return [];
        })
        .then((data) => {
          setActivities(data as Activity[]);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading && session?.user) {
      return <div className="p-6 text-muted-foreground text-center">Memuat aktivitas...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <ActivityLogger />
      <ActivityHistory activities={activities} />
    </div>
  );
}
