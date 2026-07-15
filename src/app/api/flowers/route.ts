import { seedFlowers } from "@/data/seed";
import { connectDB } from "@/lib/db";
import { Flower } from "@/models/Flower";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  if ((await Flower.countDocuments()) === 0) {
    await Flower.insertMany(seedFlowers);
  }

  const flowers = await Flower.find().sort({ name: 1 }).lean();
  return NextResponse.json(flowers);
}
