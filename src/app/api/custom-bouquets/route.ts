import { connectDB } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { CustomBouquet } from "@/models/CustomBouquet";
import { NextResponse } from "next/server";

interface BouquetFlowerInput {
  flowerId?: string;
  name?: string;
  quantity?: number;
}

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const bouquets = await CustomBouquet.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(bouquets);
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Please login first" }, { status: 401 });
  }

  const body = await request.json();
  const flowers = Array.isArray(body.flowers)
    ? body.flowers.filter((item: BouquetFlowerInput) => Number(item.quantity) > 0)
    : [];

  if (flowers.length === 0) {
    return NextResponse.json(
      { message: "Select at least one flower" },
      { status: 400 }
    );
  }

  await connectDB();
  const bouquet = await CustomBouquet.create({
    userId: user.id,
    userEmail: user.email,
    flowers,
    wrapping: body.wrapping || "Classic kraft wrap",
    message: body.message || "",
  });

  return NextResponse.json(bouquet, { status: 201 });
}
