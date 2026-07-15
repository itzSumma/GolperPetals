import { seedInstantBouquets } from "@/data/seed";
import { connectDB } from "@/lib/db";
import { InstantBouquet } from "@/models/InstantBouquet";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  if ((await InstantBouquet.countDocuments()) === 0) {
    await InstantBouquet.insertMany(seedInstantBouquets);
  }

  const bouquets = await InstantBouquet.find().sort({ price: 1 }).lean();
  return NextResponse.json(bouquets);
}
