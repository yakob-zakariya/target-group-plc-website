import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
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

    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        image: data.image || null,
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        linkedin: data.linkedin || null,
        order: data.order || 1,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("Failed to create team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

