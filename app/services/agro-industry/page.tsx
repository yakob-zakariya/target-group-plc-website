import { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { Factory } from "lucide-react";

export const metadata: Metadata = {
  title: "Agro Industry",
  description:
    "Sustainable agricultural manufacturing and processing solutions. Food processing, agricultural equipment, and supply chain management.",
};

const features = [
  {
    title: "Food Processing",
    description:
      "Modern food processing facilities producing quality packaged foods that meet international standards.",
  },
  {
    title: "Agricultural Equipment",
    description:
      "Distribution of farming machinery and equipment to modernize agricultural practices.",
  },
  {
    title: "Crop Production",
    description:
      "Large-scale crop cultivation using sustainable farming methods and modern techniques.",
  },
  {
    title: "Supply Chain Solutions",
    description:
      "End-to-end agricultural supply chain management from farm to market.",
  },
  {
    title: "Storage & Warehousing",
    description:
      "Climate-controlled storage facilities to preserve agricultural products and reduce post-harvest losses.",
  },
  {
    title: "Quality Control",
    description:
      "Rigorous quality testing and certification to ensure food safety and product excellence.",
  },
];

const benefits = [
  "State-of-the-art processing facilities",
  "Sustainable and environmentally friendly practices",
  "Support for local farmers and communities",
  "International quality certifications",
  "Reliable supply chain infrastructure",
  "Research and development for continuous improvement",
];

export default function AgroIndustryPage() {
  return (
    <ServicePageTemplate
      title="Agro Industry"
      subtitle="Sustainable Agriculture"
      description="Our manufacturing arm focuses on sustainable agricultural processing and production, supporting local farmers while ensuring food security and contributing to the nation's economic growth."
      icon={Factory}
      color="from-green-500 to-green-700"
      features={features}
      benefits={benefits}
      backgroundImage="/images/pages/agro.jpg"
      serviceImage="/images/services/agro.jpg"
    />
  );
}
