import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET single benefit
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; benefitId: string }> }
) {
  try {
    const { benefitId } = await params;

    const benefit = await prisma.serviceBenefit.findUnique({
      where: { id: benefitId },
    });

    if (!benefit) {
      return NextResponse.json(
        { error: "Benefit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(benefit);
  } catch (error) {
    console.error("Failed to fetch service benefit:", error);
    return NextResponse.json(
      { error: "Failed to fetch service benefit" },
      { status: 500 }
    );
  }
}

// PATCH update benefit
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; benefitId: string }> }
) {
  try {
    const { benefitId } = await params;
    const body = await request.json();

    const benefit = await prisma.serviceBenefit.update({
      where: { id: benefitId },
      data: {
        text: body.text,
        order: body.order,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.error("Failed to update service benefit:", error);
    return NextResponse.json(
      { error: "Failed to update service benefit" },
      { status: 500 }
    );
  }
}

// DELETE benefit
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; benefitId: string }> }
) {
  try {
    const { benefitId } = await params;

    await prisma.serviceBenefit.delete({
      where: { id: benefitId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service benefit:", error);
    return NextResponse.json(
      { error: "Failed to delete service benefit" },
      { status: 500 }
    );
  }
}

