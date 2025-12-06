import Button from "@/components/ui/Button";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-8 py-16 sm:px-16 sm:py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 400 400" fill="none">
              <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Partner With Us?
              </h2>
              <p className="text-lg text-primary-100">
                Whether you&apos;re looking for quality construction materials, exploring trade 
                opportunities, or seeking innovative IT solutions, we&apos;re here to help you 
                achieve your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                href="tel:+251111234567"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

