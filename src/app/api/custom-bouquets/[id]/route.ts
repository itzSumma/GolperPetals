import { connectDB } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { CustomBouquet } from "@/models/CustomBouquet";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  await connectDB();

  const bouquet = await CustomBouquet.findOneAndUpdate(
    { _id: id, userId: user.id },
    {
      wrapping: body.wrapping || "Classic kraft wrap",
      message: body.message || "",
      flowers: Array.isArray(body.flowers) ? body.flowers : [],
    },
    { new: true }
  );

  if (!bouquet) {
    return NextResponse.json({ message: "Bouquet not found" }, { status: 404 });
  }

  return NextResponse.json(bouquet);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connectDB();

  const result = await CustomBouquet.deleteOne({ _id: id, userId: user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Bouquet not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Bouquet deleted" });
}
