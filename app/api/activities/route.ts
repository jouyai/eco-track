import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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

    const activities = await prisma.activity.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: 50, // Limit history
    });

    return NextResponse.json(activities);
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

    const activity = await prisma.activity.create({
      data: {
        userId: session.user.id,
        type,
        name: subType,
        value,
        unit,
        carbonFootprint,
        passengers,
        date: new Date(),
      },
    });

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

        const activity = await prisma.activity.findUnique({
            where: { id },
        });

        if (!activity || activity.userId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
        }

        await prisma.activity.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
