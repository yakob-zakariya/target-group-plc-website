"use client";

import { useState, useEffect } from "react";
import ServicePageTemplate from "./ServicePageTemplate";

interface ServiceItem {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
}

interface ServiceBenefit {
  id: string;
  text: string;
}

interface ServiceData {
  id: string;
  name: string;
  description: string;
  image: string | null;
  items: ServiceItem[];
  benefits: ServiceBenefit[];
}

interface DynamicServicePageProps {
  slug: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackFeatures: { title: string; description: string }[];
  fallbackBenefits: string[];
  color: string;
  backgroundImage: string;
  serviceImage: string;
}

export default function DynamicServicePage({
  slug,
  fallbackTitle,
  fallbackDescription,
  fallbackFeatures,
  fallbackBenefits,
  color,
  backgroundImage,
  serviceImage,
}: DynamicServicePageProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // Use database data if available, otherwise fallback to static data
  const title = service?.name || fallbackTitle;
  const description = service?.description || fallbackDescription;
  
  // Convert service items to features format
  const features = service?.items && service.items.length > 0
    ? service.items.map((item) => ({
        title: item.name,
        description: item.description || "",
        image: item.image,
      }))
    : fallbackFeatures;

  // Convert service benefits to array of strings
  const benefits = service?.benefits && service.benefits.length > 0
    ? service.benefits.map((b) => b.text)
    : fallbackBenefits;

  // Use service image from DB if available
  const finalServiceImage = service?.image || serviceImage;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <ServicePageTemplate
      title={title}
      description={description}
      color={color}
      features={features}
      benefits={benefits}
      backgroundImage={backgroundImage}
      serviceImage={finalServiceImage}
    />
  );
}

