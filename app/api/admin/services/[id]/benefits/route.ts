import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET all benefits for a service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const benefits = await prisma.serviceBenefit.findMany({
      where: { serviceId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(benefits);
  } catch (error) {
    console.error("Failed to fetch service benefits:", error);
    return NextResponse.json(
      { error: "Failed to fetch service benefits" },
      { status: 500 }
    );
  }
}

// POST create new benefit
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const benefit = await prisma.serviceBenefit.create({
      data: {
        text: body.text,
        order: body.order || 0,
        isActive: body.isActive ?? true,
        serviceId: id,
      },
    });

    return NextResponse.json(benefit, { status: 201 });
  } catch (error) {
    console.error("Failed to create service benefit:", error);
    return NextResponse.json(
      { error: "Failed to create service benefit" },
      { status: 500 }
    );
  }
}

