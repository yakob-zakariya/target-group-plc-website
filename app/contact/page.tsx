import { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import Button from "@/components/ui/Button";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Target Group PLC. We're here to answer your questions and discuss partnership opportunities.",
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
    <>
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
              <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and
                  we&apos;ll get back to you as
                  soon as possible.
                </p>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="+251 91 234 5678"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">
                        Select a subject
                      </option>
                      <option value="construction">
                        Construction Materials
                      </option>
                      <option value="agro">
                        Agro Industry
                      </option>
                      <option value="trade">
                        Import & Export
                      </option>
                      <option value="education">
                        Education
                      </option>
                      <option value="it">
                        IT Services
                      </option>
                      <option value="partnership">
                        Partnership Inquiry
                      </option>
                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Send className="mr-2 h-5 w-5" />{" "}
                    Send Message
                  </Button>
                </form>
              </div>
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
    </>
  );
}
