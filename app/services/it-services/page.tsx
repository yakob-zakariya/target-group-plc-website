import { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "Digital transformation and technology solutions. Software development, IT consulting, cloud solutions, and digital marketing.",
};

const features = [
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

const benefits = [
  "Experienced team of technology professionals",
  "Agile development methodology for faster delivery",
  "Scalable solutions that grow with your business",
  "Latest technologies and best practices",
  "Cost-effective pricing models",
  "Ongoing support and maintenance",
];

export default function ITServicesPage() {
  return (
    <ServicePageTemplate
      title="IT Services"
      subtitle="Digital Excellence"
      description="Digital transformation and technology solutions that help businesses modernize their operations, improve efficiency, and compete effectively in the digital age."
      icon={Monitor}
      color="from-cyan-500 to-cyan-700"
      features={features}
      benefits={benefits}
      backgroundImage="/images/pages/it.jpg"
    />
  );
}
