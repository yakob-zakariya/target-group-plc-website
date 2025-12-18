"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Factory,
  Ship,
  GraduationCap,
  Monitor,
  ArrowRight,
  Briefcase,
} from "lucide-react";

// Map icon names to Lucide icons
const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Building2,
  Factory,
  Ship,
  GraduationCap,
  Monitor,
  Briefcase,
};

// Fallback services in case API fails
const fallbackServiceItems = [
  {
    name: "Construction Materials",
    href: "/services/construction-materials",
    icon: "Building2",
    description: "Premium building materials",
  },
  {
    name: "Agro Industry",
    href: "/services/agro-industry",
    icon: "Factory",
    description: "Agricultural processing",
  },
  {
    name: "Import & Export",
    href: "/services/import-export",
    icon: "Ship",
    description: "Global trade solutions",
  },
  {
    name: "Education",
    href: "/services/education",
    icon: "GraduationCap",
    description: "Learning & development",
  },
  {
    name: "IT Services",
    href: "/services/it-services",
    icon: "Monitor",
    description: "Digital solutions",
  },
];

interface ServiceItem {
  name: string;
  href: string;
  icon: string;
  description: string;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
  },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [servicesOpen, setServicesOpen] =
    useState(false);
  const [
    mobileServicesOpen,
    setMobileServicesOpen,
  ] = useState(false);
  const [isScrolled, setIsScrolled] =
    useState(false);
  const [serviceItems, setServiceItems] =
    useState<ServiceItem[]>(fallbackServiceItems);
  const dropdownTimeout =
    useRef<NodeJS.Timeout | null>(null);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150); // Small delay to prevent accidental closing
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const formattedServices = data.map(
              (service: {
                name: string;
                slug: string;
                description: string;
                icon: string | null;
              }) => ({
                name: service.name,
                href: `/services/${service.slug}`,
                icon: service.icon || "Briefcase",
                description:
                  service.description?.substring(
                    0,
                    30
                  ) + "..." || "",
              })
            );
            setServiceItems(formattedServices);
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch services:",
          error
        );
        // Keep fallback services
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Change header style after scrolling past 100px (roughly the hero visible area)
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );
    // Check initial scroll position
    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/images/target-logo-last.png"
              alt="Target Group PLC"
              width={180}
              height={100}
              className="h-48 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 text-base font-semibold transition-colors py-2 ${
                      isActive(item.href)
                        ? isScrolled
                          ? "text-primary-600"
                          : "text-primary-300"
                        : isScrolled
                        ? "text-gray-800 hover:text-primary-600"
                        : "text-white hover:text-primary-300"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        servicesOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  {/* Dropdown with improved UX */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      servicesOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* View All Services Link */}
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-5 py-3 bg-primary-50 border-b border-gray-100 hover:bg-primary-100 transition-colors group"
                      >
                        <span className="text-sm font-semibold text-primary-700">
                          View All Services
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {/* Service Items */}
                      <div className="py-2">
                        {serviceItems.map(
                          (service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                                isActive(
                                  service.href
                                )
                                  ? "bg-primary-50"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                                  isActive(
                                    service.href
                                  )
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {(() => {
                                  const IconComponent =
                                    iconMap[
                                      service.icon
                                    ] ||
                                    Briefcase;
                                  return (
                                    <IconComponent className="h-5 w-5" />
                                  );
                                })()}
                              </div>
                              <div>
                                <p
                                  className={`text-sm font-semibold ${
                                    isActive(
                                      service.href
                                    )
                                      ? "text-primary-600"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {service.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {
                                    service.description
                                  }
                                </p>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? isScrolled
                        ? "text-primary-600"
                        : "text-primary-300"
                      : isScrolled
                      ? "text-gray-800 hover:text-primary-600"
                      : "text-white hover:text-primary-300"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className={`ml-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${
                isScrolled
                  ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700"
                  : "bg-white text-primary-600 hover:bg-gray-100"
              }`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden rounded-md p-2.5 transition-colors ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileServicesOpen(
                            !mobileServicesOpen
                          )
                        }
                        className={`flex items-center justify-between w-full py-3 text-base font-semibold ${
                          isActive(item.href)
                            ? "text-primary-600"
                            : "text-gray-800"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileServicesOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {/* Collapsible services list */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileServicesOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <Link
                          href="/services"
                          className="flex items-center gap-2 py-2 px-3 mb-1 text-sm font-semibold text-primary-600 bg-primary-50 rounded-lg"
                          onClick={() =>
                            setMobileMenuOpen(
                              false
                            )
                          }
                        >
                          <ArrowRight className="h-4 w-4" />
                          View All Services
                        </Link>
                        <div className="space-y-1">
                          {serviceItems.map(
                            (service) => (
                              <Link
                                key={service.name}
                                href={
                                  service.href
                                }
                                className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
                                  isActive(
                                    service.href
                                  )
                                    ? "bg-primary-50 text-primary-600"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                                onClick={() =>
                                  setMobileMenuOpen(
                                    false
                                  )
                                }
                              >
                                {(() => {
                                  const IconComponent =
                                    iconMap[
                                      service.icon
                                    ] ||
                                    Briefcase;
                                  return (
                                    <IconComponent className="h-5 w-5 shrink-0" />
                                  );
                                })()}
                                <span className="text-sm font-medium">
                                  {service.name}
                                </span>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-3 text-base font-semibold ${
                        isActive(item.href)
                          ? "text-primary-600"
                          : "text-gray-800 hover:text-primary-600"
                      }`}
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <Link
                href="/contact"
                className="block w-full text-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
