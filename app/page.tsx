import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import TeamSection from "@/components/sections/TeamSection";
import CTASection from "@/components/sections/CTASection";
import PublicLayout from "@/components/layout/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <TeamSection />
      <CTASection />
    </PublicLayout>
  );
}
