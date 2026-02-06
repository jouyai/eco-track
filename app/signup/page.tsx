"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Leaf from "lucide-react/dist/esm/icons/leaf";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Github from "lucide-react/dist/esm/icons/github";
import Chrome from "lucide-react/dist/esm/icons/chrome";
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/lib/validations/auth";
import { loginWithSocial, registerUser } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupInput) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerUser(data).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success + " Silakan login.");
          // Optional: Redirect to login after success
          setTimeout(() => router.push("/login"), 2000);
        }
      });
    });
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Visuals */}
      <div className="hidden md:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden order-last">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 text-right">
          <Link href="/" className="inline-flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EcoTrack</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md ml-auto text-right">
          <blockquote className="space-y-4">
            <p className="text-xl font-medium leading-relaxed">
              &ldquo;Bergabung dengan EcoTrack adalah keputusan terbaik untuk gaya hidup berkelanjutan saya. Datanya sangat akurat dan memotivasi.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              — Michael Chen, Sustainable Living Advocate
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm text-zinc-500 text-right">
          © 2026 EcoTrack Inc.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col p-8 md:p-12 justify-center relative bg-background">
        <div className="absolute top-8 left-8 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold">EcoTrack</span>
          </Link>
        </div>

        <Link href="/" className="absolute top-8 left-8 hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
        
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-muted-foreground">
              Mulai perjalanan hijau Anda hari ini. Gratis selamanya.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                type="text" 
                autoCapitalize="words" 
                autoComplete="name" 
                autoCorrect="off" 
                {...register("name")}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                placeholder="nama@contoh.com" 
                type="email" 
                autoCapitalize="none" 
                autoComplete="email" 
                autoCorrect="off" 
                {...register("email")}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                {...register("password")}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="w-full font-semibold" type="submit" disabled={isPending}>
              {isPending ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau daftar dengan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" onClick={() => loginWithSocial("github")}>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" type="button" onClick={() => loginWithSocial("google")}>
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary font-medium">
              Masuk disini
            </Link>
          </p>

          <p className="px-8 text-center text-xs text-muted-foreground">
            Dengan mendaftar, Anda menyetujui{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </div>
      </div>
    </div>
  );
}
