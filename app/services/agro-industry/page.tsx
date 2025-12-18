import { Metadata } from "next";
import DynamicServicePage from "@/components/sections/DynamicServicePage";

export const metadata: Metadata = {
  title: "Agro Industry",
  description:
    "Sustainable agricultural manufacturing and processing solutions. Food processing, agricultural equipment, and supply chain management.",
};

const fallbackFeatures = [
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

const fallbackBenefits = [
  "State-of-the-art processing facilities",
  "Sustainable and environmentally friendly practices",
  "Support for local farmers and communities",
  "International quality certifications",
  "Reliable supply chain infrastructure",
  "Research and development for continuous improvement",
];

export default function AgroIndustryPage() {
  return (
    <DynamicServicePage
      slug="agro-industry"
      fallbackTitle="Agro Industry"
      fallbackDescription="Our manufacturing arm focuses on sustainable agricultural processing and production, supporting local farmers while ensuring food security and contributing to the nation's economic growth."
      fallbackFeatures={fallbackFeatures}
      fallbackBenefits={fallbackBenefits}
      color="from-green-500 to-green-700"
      backgroundImage="/images/pages/agro.jpg"
      serviceImage="/images/services/agro.jpg"
    />
  );
}
