import {
  Images,
  Briefcase,
  Users,
  Eye,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";

// Force dynamic rendering - admin pages need fresh data
export const dynamic = "force-dynamic";

async function getStats() {
  const [heroSlides, services, teamMembers] =
    await Promise.all([
      prisma.heroSlide.count({
        where: { isActive: true },
      }),
      prisma.service.count({
        where: { isActive: true },
      }),
      prisma.teamMember.count({
        where: { isActive: true },
      }),
    ]);

  return { heroSlides, services, teamMembers };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: "Hero Slides",
      count: stats.heroSlides,
      icon: Images,
      href: "/admin/hero-slides",
      color: "bg-blue-500",
    },
    {
      title: "Services",
      count: stats.services,
      icon: Briefcase,
      href: "/admin/services",
      color: "bg-green-500",
    },
    {
      title: "Team Members",
      count: stats.teamMembers,
      icon: Users,
      href: "/admin/team",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Target Group admin panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {card.count}
                </p>
              </div>
              <div
                className={`${card.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}
              >
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-primary-600 mt-4 group-hover:underline">
              Manage {card.title} →
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Website
          </Link>
        </div>
      </div>
    </div>
  );
}
