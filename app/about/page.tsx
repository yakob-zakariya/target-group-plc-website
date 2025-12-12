import { Metadata } from "next";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import PageHero from "@/components/sections/PageHero";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Target Group PLC - our mission, vision, values, and the team driving our success across multiple industries.",
};

const values = [
  {
    title: "Integrity",
    description:
      "We conduct our business with honesty and transparency.",
    icon: Award,
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas and technologies to stay ahead.",
    icon: Lightbulb,
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest quality in everything we do.",
    icon: Target,
  },
  {
    title: "Teamwork",
    description:
      "We believe in the power of collaboration and unity.",
    icon: Users,
  },
];

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

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        title="About Us"
        subtitle="Target Group PLC is a dynamic conglomerate dedicated to creating lasting value across multiple industries while contributing to economic growth and community development."
        backgroundImage="/images/pages/about.jpg"
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 text-white">
              <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-primary-100 leading-relaxed">
                To deliver exceptional value to
                our stakeholders through
                diversified business operations,
                innovative solutions, and
                sustainable practices that drive
                economic growth and improve lives
                in the communities we serve.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10">
              <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To become a leading conglomerate
                in East Africa, recognized for our
                excellence in construction,
                manufacturing, trade, education,
                and technology, while setting the
                standard for corporate
                responsibility and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Values"
            title="What Drives Us"
            description="Our core values guide every decision we make and every action we take."
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
              >
                <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        id="team"
        className="py-20 bg-white"
      >
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
                <p className="text-primary-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented
            individuals and strategic partners to
            join our journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              href="/careers"
              variant="outline"
              size="lg"
            >
              View Careers
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
