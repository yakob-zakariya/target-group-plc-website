import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { Building2, Factory, Ship, GraduationCap, Monitor, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Construction Materials",
    description: "Premium quality construction materials imported from leading global manufacturers for your building projects.",
    icon: Building2,
    href: "/services/construction-materials",
    color: "bg-blue-500",
  },
  {
    title: "Agro Industry",
    description: "Modern agricultural manufacturing and processing solutions driving the future of sustainable farming.",
    icon: Factory,
    href: "/services/agro-industry",
    color: "bg-green-500",
  },
  {
    title: "Import & Export",
    description: "Comprehensive international trade solutions connecting markets and facilitating seamless global commerce.",
    icon: Ship,
    href: "/services/import-export",
    color: "bg-amber-500",
  },
  {
    title: "Education",
    description: "Innovative educational programs and institutions shaping the next generation of leaders and professionals.",
    icon: GraduationCap,
    href: "/services/education",
    color: "bg-purple-500",
  },
  {
    title: "IT Services",
    description: "Cutting-edge technology solutions and digital transformation services for modern businesses.",
    icon: Monitor,
    href: "/services/it-services",
    color: "bg-cyan-500",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Services"
          title="Comprehensive Business Solutions"
          description="We operate across five strategic sectors, delivering excellence and innovation in every venture we undertake."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className={`h-14 w-14 rounded-xl ${service.color} bg-opacity-10 flex items-center justify-center mb-6`}>
                <service.icon className={`h-7 w-7 ${service.color.replace("bg-", "text-")}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center justify-between">
                {service.title}
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

