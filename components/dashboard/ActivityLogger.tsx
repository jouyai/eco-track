"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Car from "lucide-react/dist/esm/icons/car";
import Zap from "lucide-react/dist/esm/icons/zap";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import Bus from "lucide-react/dist/esm/icons/bus";
import Bike from "lucide-react/dist/esm/icons/bike";
import Train from "lucide-react/dist/esm/icons/train";
import Recycle from "lucide-react/dist/esm/icons/recycle";
import Lightbulb from "lucide-react/dist/esm/icons/lightbulb";
import { toast } from "sonner";

export function ActivityLogger() {
  const [activeTab, setActiveTab] = useState("transport");
  const [isPending, startTransition] = useTransition();
  const [transportType, setTransportType] = useState("car");

  const handleTransportSubmit = (formData: FormData) => {
    formData.append("type", "transport");
    formData.append("subType", transportType);
    formData.append("unit", "km");
    
    startTransition(async () => {
        try {
            const res = await fetch("/api/activities", {
              method: "POST",
              body: formData,
            });
            if (!res.ok) throw new Error("Failed");
            
            toast.success("Transportasi berhasil dicatat!");
            const form = document.getElementById("transport-form") as HTMLFormElement;
            if (form) form.reset();
        } catch (error) {
            toast.error("Gagal mencatat aktivitas.");
        }
    });
  };

  const handleEnergySubmit = (formData: FormData) => {
    formData.append("type", "energy");
    const subType = formData.get("subType") as string;
    const unit = subType === "electricity" ? "kWh" : (subType === "gas" ? "m3" : "kg");
    formData.append("unit", unit);

    startTransition(async () => {
        try {
            const res = await fetch("/api/activities", {
              method: "POST",
              body: formData,
            });
            if (!res.ok) throw new Error("Failed");

            toast.success("Energi berhasil dicatat!");
            const form = document.getElementById("energy-form") as HTMLFormElement;
            if (form) form.reset();
        } catch (error) {
            toast.error("Gagal mencatat aktivitas.");
        }
    });
  };

  const handleLifestyleSubmit = (actionId: string, actionLabel: string) => {
      const formData = new FormData();
      formData.append("type", "lifestyle");
      formData.append("subType", actionId);
      formData.append("value", "1");
      formData.append("unit", "action");

      startTransition(async () => {
          try {
            const res = await fetch("/api/activities", {
              method: "POST",
              body: formData,
            });
            if (!res.ok) throw new Error("Failed");

            toast.success(`Aksi "${actionLabel}" berhasil dicatat!`);
          } catch (error) {
            toast.error("Gagal mencatat aktivitas.");
          }
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Catat Aktivitas</h2>
        <p className="text-muted-foreground">
          Pantau jejak karbon Anda dengan mencatat aktivitas harian.
        </p>
      </div>

      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setActiveTab("transport")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
            activeTab === "transport" 
              ? "border-b-2 border-primary text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Car className="h-4 w-4" />
          Transportasi
        </button>
        <button
          onClick={() => setActiveTab("energy")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
            activeTab === "energy" 
              ? "border-b-2 border-primary text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Zap className="h-4 w-4" />
          Energi Rumah
        </button>
        <button
          onClick={() => setActiveTab("lifestyle")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
            activeTab === "lifestyle" 
              ? "border-b-2 border-primary text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Leaf className="h-4 w-4" />
          Gaya Hidup
        </button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>
            {activeTab === "transport" && "Perjalanan & Transportasi"}
            {activeTab === "energy" && "Penggunaan Energi"}
            {activeTab === "lifestyle" && "Kebiasaan & Daur Ulang"}
          </CardTitle>
          <CardDescription>
            {activeTab === "transport" && "Masukkan detail perjalanan Anda untuk menghitung emisi karbon."}
            {activeTab === "energy" && "Catat penggunaan listrik atau gas di rumah Anda."}
            {activeTab === "lifestyle" && "Klik pada aksi yang telah Anda lakukan hari ini."}
          </CardDescription>
        </CardHeader>
        <CardContent>
            {activeTab === "transport" && (
              <form id="transport-form" action={handleTransportSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Jenis Transportasi</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                            type="button" 
                            variant={transportType === "car" ? "default" : "outline"}
                            onClick={() => setTransportType("car")}
                            className="flex flex-col h-20 gap-2"
                        >
                          <Car className="h-6 w-6" />
                          <span className="text-xs">Mobil</span>
                        </Button>
                        <Button 
                            type="button" 
                            variant={transportType === "bus" ? "default" : "outline"}
                            onClick={() => setTransportType("bus")}
                            className="flex flex-col h-20 gap-2"
                        >
                          <Bus className="h-6 w-6" />
                          <span className="text-xs">Bus</span>
                        </Button>
                        <Button 
                            type="button" 
                            variant={transportType === "train" ? "default" : "outline"}
                            onClick={() => setTransportType("train")}
                            className="flex flex-col h-20 gap-2"
                        >
                          <Train className="h-6 w-6" />
                          <span className="text-xs">Kereta</span>
                        </Button>
                        <Button 
                            type="button" 
                            variant={transportType === "bike" ? "default" : "outline"}
                            onClick={() => setTransportType("bike")}
                            className="flex flex-col h-20 gap-2"
                        >
                          <Bike className="h-6 w-6" />
                          <span className="text-xs">Motor</span>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="value">Jarak Tempuh (km)</Label>
                        <Input name="value" type="number" placeholder="0" min="0" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Jumlah Penumpang</Label>
                        <Input name="passengers" id="passengers" type="number" placeholder="1" min="1" defaultValue="1" />
                        <p className="text-[0.8rem] text-muted-foreground">Termasuk Anda</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan Perjalanan"}
                </Button>
              </form>
            )}

            {activeTab === "energy" && (
              <form id="energy-form" action={handleEnergySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subType">Sumber Energi</Label>
                  <select 
                    name="subType"
                    id="subType" 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="electricity">Listrik (kWh)</option>
                    <option value="gas">Gas Alam (m3)</option>
                    <option value="lpg">LPG (kg)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Jumlah Konsumsi</Label>
                  <Input name="value" type="number" placeholder="0" min="0" required />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan Penggunaan Energi"}
                </Button>
              </form>
            )}

            {activeTab === "lifestyle" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto flex flex-col items-start p-4 gap-2 whitespace-normal"
                    onClick={() => handleLifestyleSubmit("recycle_plastic", "Daur Ulang Plastik")}
                    disabled={isPending}
                  >
                    <div className="flex items-center gap-2">
                        <Recycle className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="font-semibold">Daur Ulang Plastik</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left leading-relaxed">
                        Mengolah sampah plastik menjadi barang berguna atau membuang di tempat daur ulang.
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto flex flex-col items-start p-4 gap-2 whitespace-normal"
                    onClick={() => handleLifestyleSubmit("bring_bag", "Bawa Tas Belanja")}
                    disabled={isPending}
                  >
                    <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="font-semibold">Bawa Tas Belanja</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left leading-relaxed">
                        Mengurangi penggunaan kantong plastik sekali pakai.
                    </span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto flex flex-col items-start p-4 gap-2 whitespace-normal"
                    onClick={() => handleLifestyleSubmit("turn_off_lights", "Matikan Lampu")}
                    disabled={isPending}
                  >
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0" />
                        <span className="font-semibold">Matikan Lampu</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left leading-relaxed">
                        Mematikan lampu yang tidak digunakan untuk hemat energi.
                    </span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto flex flex-col items-start p-4 gap-2 whitespace-normal"
                    onClick={() => handleLifestyleSubmit("vegan_meal", "Makan Sayuran")}
                    disabled={isPending}
                  >
                    <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="font-semibold">Makan Sayuran</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left leading-relaxed">
                        Mengganti satu porsi daging dengan sayuran.
                    </span>
                  </Button>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
