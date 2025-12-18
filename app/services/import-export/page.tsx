import { Metadata } from "next";
import DynamicServicePage from "@/components/sections/DynamicServicePage";

export const metadata: Metadata = {
  title: "Import & Export",
  description:
    "Comprehensive international trade solutions. Customs clearance, logistics support, market research, and trade documentation services.",
};

const fallbackFeatures = [
  {
    title: "Customs Clearance",
    description:
      "Expert handling of customs procedures and documentation for smooth import/export operations.",
  },
  {
    title: "Logistics Support",
    description:
      "Complete logistics solutions including shipping, freight forwarding, and inland transportation.",
  },
  {
    title: "Market Research",
    description:
      "In-depth market analysis and identification of trade opportunities in target markets.",
  },
  {
    title: "Trade Documentation",
    description:
      "Preparation and processing of all necessary trade documents, licenses, and permits.",
  },
  {
    title: "Sourcing Services",
    description:
      "Product sourcing from reliable international suppliers with quality verification.",
  },
  {
    title: "Trade Finance",
    description:
      "Assistance with letters of credit, trade insurance, and payment facilitation.",
  },
];

const fallbackBenefits = [
  "Extensive global network of partners and suppliers",
  "Deep understanding of international trade regulations",
  "Competitive rates for shipping and logistics",
  "Experienced team of trade professionals",
  "End-to-end trade facilitation services",
  "Risk management and trade compliance support",
];

export default function ImportExportPage() {
  return (
    <DynamicServicePage
      slug="import-export"
      fallbackTitle="Import & Export"
      fallbackDescription="We facilitate seamless international trade, connecting Ethiopian markets with global opportunities through our extensive network of partners and deep expertise in cross-border commerce."
      fallbackFeatures={fallbackFeatures}
      fallbackBenefits={fallbackBenefits}
      color="from-amber-500 to-amber-700"
      backgroundImage="/images/pages/trade.jpg"
      serviceImage="/images/services/trade.jpg"
    />
  );
}
