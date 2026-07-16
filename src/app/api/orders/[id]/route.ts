import { connectDB } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connectDB();

  const result = await Order.deleteOne({ _id: id, userId: user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order deleted" });
}
