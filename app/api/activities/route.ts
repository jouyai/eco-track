import { auth } from "@/auth";
import { db } from "@/lib/db";
import { activities } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = 'edge';

// --- Carbon Calculation Constants ---
const CARBON_FACTORS: Record<string, number> = {
  "car": 0.192,
  "bus": 0.105,
  "train": 0.041,
  "bike": 0,
  "electricity": 0.5,
  "gas": 2.0,
  "lpg": 1.5,
  "recycle_plastic": -0.5,
  "bring_bag": -0.1,
  "vegan_meal": -1.5,
  "cold_shower": -0.3,
  "turn_off_lights": -0.1,
};

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.activities.findMany({
      where: eq(activities.userId, session.user.id),
      orderBy: [desc(activities.date)],
      limit: 50,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const type = formData.get("type") as string;
    const subType = formData.get("subType") as string;
    const value = parseFloat(formData.get("value") as string || "1");
    const unit = formData.get("unit") as string || "action";
    const passengers = parseInt(formData.get("passengers") as string || "1");

    let factor = CARBON_FACTORS[subType] || 0;
    let carbonFootprint = value * factor;

    if (type === "transport" && passengers > 1) {
      carbonFootprint = carbonFootprint / passengers;
    }

    const [activity] = await db.insert(activities).values({
        userId: session.user.id,
        type,
        name: subType,
        value,
        unit,
        carbonFootprint,
        passengers,
        date: new Date(),
    }).returning();

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.delete(activities).where(eq(activities.id, id));
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
