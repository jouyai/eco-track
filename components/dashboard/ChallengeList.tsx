"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  reward: string;
  target: number;
  unit: string;
}

interface UserChallenge {
  id: string;
  challengeId: string;
  progress: number;
  challenge: Challenge;
}

interface ChallengeListProps {
  activeChallenges: UserChallenge[];
  availableChallenges: Challenge[];
}

export function ChallengeList({ activeChallenges, availableChallenges }: ChallengeListProps) {
  const [isPending, startTransition] = useTransition();

  const handleJoin = (challengeId: string, title: string) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/challenges/join", {
          method: "POST",
          body: JSON.stringify({ challengeId }),
        });
        if (!res.ok) throw new Error("Failed");

        toast.success(`Berhasil mengikuti tantangan "${title}"!`);
      } catch (error) {
        toast.error("Gagal mengikuti tantangan.");
      }
    });
  };

  const handleUpdate = (challengeId: string) => {
      startTransition(async () => {
          try {
            const res = await fetch("/api/challenges/progress", {
              method: "POST",
              body: JSON.stringify({ challengeId }),
            });
            
            if (!res.ok) throw new Error("Failed");
            
            const data = (await res.json()) as { completed: boolean };
            if (data.completed) {
                toast.success("Selamat! Tantangan selesai!");
            } else {
                toast.success("Progres diperbarui!");
            }
          } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Gagal memperbarui progres.");
            }
          }
      });
  };

  return (
    <div className="flex flex-col gap-8">
      {activeChallenges.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Sedang Berjalan
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {activeChallenges.map((uc) => {
              const progressPercent = Math.min(100, Math.round((uc.progress / uc.challenge.target) * 100));
              return (
                <Card key={uc.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{uc.challenge.title}</CardTitle>
                      <Badge variant="secondary">{uc.challenge.reward}</Badge>
                    </div>
                    <CardDescription>{uc.challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progres</span>
                        <span className="font-medium">{uc.progress} / {uc.challenge.target} {uc.challenge.unit}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500" 
                          style={{ width: `${progressPercent}%` }} 
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                        variant="outline" 
                        className="w-full text-blue-600 hover:text-blue-700"
                        onClick={() => handleUpdate(uc.challenge.id)}
                        disabled={isPending}
                    >
                      Update Progres (+1)
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Tantangan Tersedia
        </h3>
        {availableChallenges.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
            {availableChallenges.map((challenge) => (
                <Card key={challenge.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={
                        challenge.difficulty === "Easy" ? "text-green-600 border-green-200 bg-green-50" :
                        challenge.difficulty === "Medium" ? "text-yellow-600 border-yellow-200 bg-yellow-50" :
                        "text-red-600 border-red-200 bg-red-50"
                    }>
                        {challenge.difficulty}
                    </Badge>
                    <span className="text-sm font-bold text-primary">{challenge.reward}</span>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                    {challenge.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4">
                    <Button 
                        className="w-full" 
                        onClick={() => handleJoin(challenge.id, challenge.title)}
                        disabled={isPending}
                    >
                        Ambil Tantangan
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        ) : (
            <p className="text-muted-foreground">Tidak ada tantangan baru saat ini.</p>
        )}
      </section>
    </div>
  );
}
