import Button from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const highlights = [
  "Industry-leading expertise across multiple sectors",
  "Committed to sustainable business practices",
  "Strong partnerships with global leaders",
  "Dedicated to community development",
];

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-3xl blur-2xl opacity-40" />
            <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">2024</p>
                  <p className="text-primary-200 text-sm">Year Founded</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">5+</p>
                  <p className="text-primary-200 text-sm">Business Sectors</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">50+</p>
                  <p className="text-primary-200 text-sm">Team Members</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">100%</p>
                  <p className="text-primary-200 text-sm">Commitment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              About Target Group PLC
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Driving Growth Through Diversification
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Target Group PLC is a dynamic and forward-thinking conglomerate established 
              with a vision to create value across multiple industries. We believe in the 
              power of diversification to build resilient businesses that contribute to 
              economic growth.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our portfolio spans construction materials, agro-industry manufacturing, 
              international trade, education, and IT services. Each sector is managed by 
              experienced professionals committed to excellence and innovation.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/about" size="lg">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

