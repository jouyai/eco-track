"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChallengeList } from "@/components/dashboard/ChallengeList";

export default function ChallengesPage() {
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

  interface ChallengesData {
    active: UserChallenge[];
    available: Challenge[];
  }

  const { data: session } = useSession();
  const [data, setData] = useState<ChallengesData>({ active: [], available: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/challenges")
        .then((res) => {
          if (res.ok) return res.json();
          return { active: [], available: [] };
        })
        .then((data) => {
          setData(data as ChallengesData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading && session?.user) {
    return <div className="p-6 text-center text-muted-foreground">Memuat tantangan...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Tantangan</h2>
        <p className="text-muted-foreground">
          Selesaikan misi ramah lingkungan dan raih penghargaan.
        </p>
      </div>

      <ChallengeList activeChallenges={data.active} availableChallenges={data.available} />
    </div>
  );
}
