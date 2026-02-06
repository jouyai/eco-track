import { getAllActivities } from "@/lib/actions/activity";
import { ActivityLogger } from "@/components/dashboard/ActivityLogger";
import { ActivityHistory } from "@/components/dashboard/ActivityHistory";

export const dynamic = 'force-dynamic';

export default async function ActivityPage() {
  const activities = await getAllActivities();

  return (
    <div className="flex flex-col gap-8">
      <ActivityLogger />
      <ActivityHistory activities={activities} />
    </div>
  );
}
