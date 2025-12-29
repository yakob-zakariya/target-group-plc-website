import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { ArrowRight, User } from "lucide-react";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

async function getTeamMembers(): Promise<
  TeamMember[]
> {
  // Disable caching - always fetch fresh data
  noStore();

  try {
    const members =
      await prisma.teamMember.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        take: 4, // Only show 4 members on home page
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        },
      });
    return members;
  } catch (error) {
    console.error(
      "Failed to fetch team members:",
      error
    );
    return [];
  }
}

export default async function TeamSection() {
  const team = await getTeamMembers();

  if (team.length === 0) {
    return null; // Don't show section if no team members
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Leadership"
          title="Meet Our Team"
          description="Experienced professionals leading Target Group PLC towards excellence."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="text-center group"
            >
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-primary-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            href="/about#team"
            variant="outline"
          >
            Learn More About Our Team{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
