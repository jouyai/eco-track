"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Settings from "lucide-react/dist/esm/icons/settings";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import PlusCircle from "lucide-react/dist/esm/icons/plus-circle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Catat Aktivitas",
    href: "/dashboard/activity",
    icon: PlusCircle,
  },
  {
    title: "Tantangan",
    href: "/dashboard/challenges",
    icon: Trophy,
  },
  {
    title: "Statistik",
    href: "/dashboard/stats",
    icon: BarChart3,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Leaf className="h-6 w-6" />
          <span>EcoTrack</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <form action="/api/auth/signout" method="POST">
             <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
                Keluar
             </Button>
        </form>
      </div>
    </div>
  );
}
