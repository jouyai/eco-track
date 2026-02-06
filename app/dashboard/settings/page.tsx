import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Trash2, User } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola profil dan preferensi akun Anda.
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Saya</CardTitle>
            <CardDescription>Informasi pribadi dan detail akun Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="font-medium text-lg">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue={user?.name || ""} disabled />
                <p className="text-[0.8rem] text-muted-foreground">
                  Nama ini akan ditampilkan di profil Anda.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user?.email || ""} disabled />
                <p className="text-[0.8rem] text-muted-foreground">
                  Email digunakan untuk login dan notifikasi.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" disabled>Simpan Perubahan (Segera Hadir)</Button>
          </CardFooter>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preferensi</CardTitle>
            <CardDescription>Atur tampilan dan notifikasi aplikasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Mode Gelap</Label>
                <p className="text-sm text-muted-foreground">
                  Sesuaikan tampilan aplikasi dengan preferensi Anda.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                 {/* Placeholder for theme toggle */}
                 <span className="text-sm text-muted-foreground">Otomatis (Sistem)</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">
                  Terima laporan mingguan tentang jejak karbon Anda.
                </p>
              </div>
               {/* Placeholder for switch */}
               <span className="text-sm font-medium text-primary">Aktif</span>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Area Berbahaya</CardTitle>
            <CardDescription className="text-red-600/80 dark:text-red-400/80">
              Tindakan ini tidak dapat dibatalkan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="font-medium text-sm">Hapus Akun</h4>
                   <p className="text-xs text-muted-foreground">
                      Menghapus permanen akun dan semua data aktivitas Anda.
                   </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                   <Trash2 className="h-4 w-4" /> Hapus Akun
                </Button>
             </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center pt-4">
           <form action="/api/auth/signout" method="POST">
             <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                <LogOut className="h-4 w-4" /> Keluar dari Aplikasi
             </Button>
           </form>
        </div>
      </div>
    </div>
  );
}
