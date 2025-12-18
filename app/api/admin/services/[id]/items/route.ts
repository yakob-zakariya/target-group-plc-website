import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET all items for a service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const items = await prisma.serviceItem.findMany({
      where: { serviceId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch service items:", error);
    return NextResponse.json(
      { error: "Failed to fetch service items" },
      { status: 500 }
    );
  }
}

// POST create new item
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const item = await prisma.serviceItem.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        order: body.order || 0,
        isActive: body.isActive ?? true,
        serviceId: id,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create service item:", error);
    return NextResponse.json(
      { error: "Failed to create service item" },
      { status: 500 }
    );
  }
}

