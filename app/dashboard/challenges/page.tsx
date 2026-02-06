import { ChallengeList } from "@/components/dashboard/ChallengeList";
import { getChallenges } from "@/lib/actions/challenge";

export default async function ChallengesPage() {
  const { active, available } = await getChallenges();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Tantangan</h2>
        <p className="text-muted-foreground">
          Selesaikan misi ramah lingkungan dan raih penghargaan.
        </p>
      </div>

      <ChallengeList activeChallenges={active} availableChallenges={available} />
    </div>
  );
}
