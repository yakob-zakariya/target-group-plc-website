import { Metadata } from "next";
import DynamicServicePage from "@/components/sections/DynamicServicePage";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "Digital transformation and technology solutions. Software development, IT consulting, cloud solutions, and digital marketing.",
};

const fallbackFeatures = [
  {
    title: "Software Development",
    description:
      "Custom software solutions, web applications, and mobile apps tailored to your business needs.",
  },
  {
    title: "IT Consulting",
    description:
      "Strategic technology consulting to help businesses leverage IT for competitive advantage.",
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud migration, infrastructure management, and cloud-native application development.",
  },
  {
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing services including SEO, social media, and content marketing.",
  },
  {
    title: "Cybersecurity",
    description:
      "Security assessments, implementation, and monitoring to protect your digital assets.",
  },
  {
    title: "IT Support",
    description:
      "24/7 technical support and managed IT services to keep your operations running smoothly.",
  },
];

const fallbackBenefits = [
  "Experienced team of technology professionals",
  "Agile development methodology for faster delivery",
  "Scalable solutions that grow with your business",
  "Latest technologies and best practices",
  "Cost-effective pricing models",
  "Ongoing support and maintenance",
];

export default function ITServicesPage() {
  return (
    <DynamicServicePage
      slug="it-services"
      fallbackTitle="IT Services"
      fallbackDescription="Digital transformation and technology solutions that help businesses modernize their operations, improve efficiency, and compete effectively in the digital age."
      fallbackFeatures={fallbackFeatures}
      fallbackBenefits={fallbackBenefits}
      color="from-cyan-500 to-cyan-700"
      backgroundImage="/images/pages/it.jpg"
      serviceImage="/images/services/it.jpg"
    />
  );
}
