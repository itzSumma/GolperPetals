import { connectDB } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { InstantBouquet } from "@/models/InstantBouquet";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const orders = await Order.find({ userId: user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Please login first" }, { status: 401 });
  }

  const { bouquetId } = await request.json();

  if (!bouquetId) {
    return NextResponse.json({ message: "Bouquet is required" }, { status: 400 });
  }

  await connectDB();
  const bouquet = await InstantBouquet.findById(bouquetId).lean();

  if (!bouquet) {
    return NextResponse.json({ message: "Bouquet not found" }, { status: 404 });
  }

  const order = await Order.create({
    userId: user.id,
    userEmail: user.email,
    bouquetId: bouquet._id.toString(),
    bouquetName: bouquet.name,
    price: bouquet.price,
    image: bouquet.image,
  });

  return NextResponse.json(order, { status: 201 });
}
