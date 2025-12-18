import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET single item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { itemId } = await params;

    const item = await prisma.serviceItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to fetch service item:", error);
    return NextResponse.json(
      { error: "Failed to fetch service item" },
      { status: 500 }
    );
  }
}

// PATCH update item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const body = await request.json();

    const item = await prisma.serviceItem.update({
      where: { id: itemId },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        order: body.order,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update service item:", error);
    return NextResponse.json(
      { error: "Failed to update service item" },
      { status: 500 }
    );
  }
}

// DELETE item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { itemId } = await params;

    await prisma.serviceItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service item:", error);
    return NextResponse.json(
      { error: "Failed to delete service item" },
      { status: 500 }
    );
  }
}

