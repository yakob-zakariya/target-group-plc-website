import Image from "next/image";
import {
  LucideIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import CTASection from "./CTASection";
import PageHero from "./PageHero";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  ServiceJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";

interface ServiceFeature {
  title: string;
  description: string;
  image?: string | null;
}

interface ServicePageTemplateProps {
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
  color: string;
  features: ServiceFeature[];
  benefits: string[];
  backgroundImage: string;
  serviceImage: string;
}

export default function ServicePageTemplate({
  title,
  slug,
  description,
  color,
  features,
  benefits,
  backgroundImage,
  serviceImage,
}: ServicePageTemplateProps) {
  const serviceUrl = slug
    ? `/services/${slug}`
    : "/services";

  return (
    <PublicLayout>
      {/* Structured Data for SEO */}
      <ServiceJsonLd
        name={title}
        description={description}
        image={serviceImage}
        url={serviceUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: title, url: serviceUrl },
        ]}
      />

      <PageHero
        title={title}
        subtitle={description}
        backgroundImage={backgroundImage}
      />

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl overflow-hidden"
              >
                {feature.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Partner with Target Group PLC for
                reliable, high-quality services
                backed by industry expertise and a
                commitment to your success.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div
                className={`absolute inset-0 bg-linear-to-r ${color} rounded-3xl blur-2xl opacity-20`}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={serviceImage}
                  alt={title}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PublicLayout>
  );
}
