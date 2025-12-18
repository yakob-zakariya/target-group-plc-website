"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

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
  slug: string;
  description: string;
  image: string | null;
  items: ServiceItem[];
  benefits: ServiceBenefit[];
}

// Default background images based on common service types
const defaultBackgrounds: Record<string, string> = {
  "construction-materials": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
  "agro-industry": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
  "import-export": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80",
  "education": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
  "it-services": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
};

const defaultServiceImages: Record<string, string> = {
  "construction-materials": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
  "agro-industry": "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
  "import-export": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
  "education": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
  "it-services": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
};

const defaultColors: Record<string, string> = {
  "construction-materials": "from-blue-600 to-blue-800",
  "agro-industry": "from-green-600 to-green-800",
  "import-export": "from-amber-600 to-amber-800",
  "education": "from-purple-600 to-purple-800",
  "it-services": "from-cyan-600 to-cyan-800",
};

export default function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        } else if (res.status === 404) {
          setNotFoundState(true);
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (notFoundState || !service) {
    notFound();
  }

  // Convert service items to features format
  const features = service.items.length > 0
    ? service.items.map((item) => ({
        title: item.name,
        description: item.description || "",
        image: item.image,
      }))
    : [{ title: "Coming Soon", description: "Service offerings are being updated." }];

  // Convert service benefits to array of strings
  const benefits = service.benefits.length > 0
    ? service.benefits.map((b) => b.text)
    : ["Professional service", "Quality guaranteed", "Expert team"];

  // Get default images/colors or use generic ones
  const backgroundImage = defaultBackgrounds[slug] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80";
  const serviceImage = service.image || defaultServiceImages[slug] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
  const color = defaultColors[slug] || "from-primary-600 to-primary-800";

  return (
    <ServicePageTemplate
      title={service.name}
      description={service.description}
      color={color}
      features={features}
      benefits={benefits}
      backgroundImage={backgroundImage}
      serviceImage={serviceImage}
    />
  );
}

