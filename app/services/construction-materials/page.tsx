import { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Materials",
  description:
    "Premium quality construction materials imported from leading global manufacturers. Steel, cement, hardware, and finishing materials.",
};

const features = [
  {
    title: "Steel & Iron Products",
    description:
      "High-grade structural steel, reinforcement bars, and iron products for durable construction.",
  },
  {
    title: "Cement & Concrete",
    description:
      "Premium cement and ready-mix concrete solutions for all types of construction projects.",
  },
  {
    title: "Building Hardware",
    description:
      "Quality hardware including fasteners, hinges, locks, and other essential building components.",
  },
  {
    title: "Finishing Materials",
    description:
      "Tiles, paints, fixtures, and other finishing materials to complete your projects beautifully.",
  },
  {
    title: "Plumbing Supplies",
    description:
      "Complete range of pipes, fittings, and plumbing accessories from trusted brands.",
  },
  {
    title: "Electrical Components",
    description:
      "Wiring, switches, panels, and electrical materials meeting international safety standards.",
  },
];

const benefits = [
  "Direct imports from certified international manufacturers",
  "Competitive pricing with bulk order discounts",
  "Quality assurance and product warranties",
  "Timely delivery across the country",
  "Expert consultation for material selection",
  "After-sales support and technical assistance",
];

export default function ConstructionMaterialsPage() {
  return (
    <ServicePageTemplate
      title="Construction Materials"
      subtitle="Building Excellence"
      description="We import and distribute premium quality construction materials from leading global manufacturers, ensuring your projects are built with the best materials available in the market."
      icon={Building2}
      color="from-blue-500 to-blue-700"
      features={features}
      benefits={benefits}
      backgroundImage="/images/pages/construction.jpg"
      serviceImage="/images/services/construction.jpg"
    />
  );
}
