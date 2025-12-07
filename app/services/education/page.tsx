import { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Quality educational programs and institutions. Vocational training, professional development, and scholarship programs.",
};

const features = [
  {
    title: "Vocational Training",
    description:
      "Hands-on skills training programs preparing students for in-demand careers in various industries.",
  },
  {
    title: "Professional Development",
    description:
      "Continuing education and certification programs for working professionals to advance their careers.",
  },
  {
    title: "Educational Consulting",
    description:
      "Strategic consulting for educational institutions seeking to improve their programs and outcomes.",
  },
  {
    title: "Scholarship Programs",
    description:
      "Financial assistance programs helping deserving students access quality education.",
  },
  {
    title: "Corporate Training",
    description:
      "Customized training solutions for businesses looking to upskill their workforce.",
  },
  {
    title: "E-Learning Solutions",
    description:
      "Digital learning platforms and content development for modern education delivery.",
  },
];

const benefits = [
  "Industry-aligned curriculum and programs",
  "Experienced educators and trainers",
  "Modern learning facilities and technology",
  "Strong industry partnerships for job placement",
  "Flexible learning schedules and formats",
  "Recognized certifications and qualifications",
];

export default function EducationPage() {
  return (
    <ServicePageTemplate
      title="Education"
      subtitle="Empowering Minds"
      description="Investing in human capital through quality educational programs and institutions that prepare students for tomorrow's challenges and equip professionals with the skills they need to succeed."
      icon={GraduationCap}
      color="from-purple-500 to-purple-700"
      features={features}
      benefits={benefits}
      backgroundImage="/images/pages/education.jpg"
      serviceImage="/images/services/education.jpg"
    />
  );
}
