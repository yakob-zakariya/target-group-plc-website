import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Failed to fetch hero slides:", error);
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const slide = await prisma.heroSlide.create({
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        image: data.image,
        buttonText: data.buttonText || null,
        buttonLink: data.buttonLink || null,
        order: data.order || 1,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("Failed to create hero slide:", error);
    return NextResponse.json(
      { error: "Failed to create slide" },
      { status: 500 }
    );
  }
}

