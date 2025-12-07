import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "John Doe",
    role: "Chief Executive Officer",
    image: "/images/team/member-1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Chief Operations Officer",
    image: "/images/team/member-2.jpg",
  },
  {
    name: "Michael Brown",
    role: "Chief Financial Officer",
    image: "/images/team/member-3.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    image: "/images/team/member-4.jpg",
  },
];

export default function TeamSection() {
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
              key={member.name}
              className="text-center group"
            >
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-primary-600">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/about#team" variant="outline">
            Learn More About Our Team <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

