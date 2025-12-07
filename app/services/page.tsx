import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/sections/PageHero";
import {
  Building2,
  Factory,
  Ship,
  GraduationCap,
  Monitor,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Target Group PLC's comprehensive services across construction materials, agro-industry, import/export, education, and IT.",
};

const services = [
  {
    title: "Construction Materials",
    description:
      "We import and distribute premium quality construction materials from leading global manufacturers, ensuring your projects are built with the best.",
    icon: Building2,
    href: "/services/construction-materials",
    color: "from-blue-500 to-blue-700",
    image: "/images/services/construction.jpg",
    features: [
      "Steel & Iron Products",
      "Cement & Concrete",
      "Building Hardware",
      "Finishing Materials",
    ],
  },
  {
    title: "Agro Industry",
    description:
      "Our manufacturing arm focuses on sustainable agricultural processing and production, supporting local farmers and food security.",
    icon: Factory,
    href: "/services/agro-industry",
    color: "from-green-500 to-green-700",
    image: "/images/services/agro.jpg",
    features: [
      "Food Processing",
      "Agricultural Equipment",
      "Crop Production",
      "Supply Chain Solutions",
    ],
  },
  {
    title: "Import & Export",
    description:
      "We facilitate seamless international trade, connecting Ethiopian markets with global opportunities through our extensive network.",
    icon: Ship,
    href: "/services/import-export",
    color: "from-amber-500 to-amber-700",
    image: "/images/services/trade.jpg",
    features: [
      "Customs Clearance",
      "Logistics Support",
      "Market Research",
      "Trade Documentation",
    ],
  },
  {
    title: "Education",
    description:
      "Investing in human capital through quality educational programs and institutions that prepare students for tomorrow's challenges.",
    icon: GraduationCap,
    href: "/services/education",
    color: "from-purple-500 to-purple-700",
    image: "/images/services/education.jpg",
    features: [
      "Vocational Training",
      "Professional Development",
      "Educational Consulting",
      "Scholarship Programs",
    ],
  },
  {
    title: "IT Services",
    description:
      "Digital transformation and technology solutions that help businesses modernize their operations and compete in the digital age.",
    icon: Monitor,
    href: "/services/it-services",
    color: "from-cyan-500 to-cyan-700",
    image: "/images/services/it.jpg",
    features: [
      "Software Development",
      "IT Consulting",
      "Cloud Solutions",
      "Digital Marketing",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="From construction to technology, we deliver excellence across five strategic sectors, providing integrated solutions for diverse business needs."
        backgroundImage="/images/pages/services.jpg"
      />

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1
                    ? "lg:flex-row-reverse"
                    : ""
                }`}
              >
                <div
                  className={
                    index % 2 === 1
                      ? "lg:order-2"
                      : ""
                  }
                >
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
                  >
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map(
                      (feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group"
                  >
                    Learn More{" "}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div
                  className={`relative ${
                    index % 2 === 1
                      ? "lg:order-1"
                      : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${service.color} rounded-3xl blur-2xl opacity-20`}
                  />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
