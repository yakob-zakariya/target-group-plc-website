import { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import PublicLayout from "@/components/layout/PublicLayout";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Target Group PLC in Addis Ababa, Ethiopia. Contact us for inquiries, partnerships, and business opportunities.",
  keywords: [
    "contact Target Group PLC",
    "Target Group Ethiopia contact",
    "business inquiries Ethiopia",
    "Addis Ababa business",
    "Ethiopian company contact",
  ],
  openGraph: {
    title: "Contact Target Group PLC",
    description:
      "Reach out to discuss partnerships, inquiries, or learn more about our services in Ethiopia.",
    url: "/contact",
    type: "website",
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Furi, Sheger City, Ethiopia",
    subContent: "",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+251 11 123 4567",
    subContent: "+251 91 234 5678",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "info@targetgroupplc.com",
    subContent: "support@targetgroupplc.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Fri: 8:30 AM - 5:30 PM",
    subContent: "Sat: 9:00 AM - 1:00 PM",
  },
];

export default function ContactPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Contact Us"
        subtitle="Have questions or want to discuss a potential partnership? We're here to help. Reach out to us through any of the channels below."
        backgroundImage="/images/pages/contact.jpg"
      />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.content}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.subContent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63048.76710988096!2d38.6530!3d8.9500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9a0b4f3a3d55%3A0x5c3e1b3a99c55a8!2sFuri%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Target Group PLC Location - Furi, Sheger City, Ethiopia"
          className="absolute inset-0"
        />
      </section>
    </PublicLayout>
  );
}
