"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      {
        name: "Construction Materials",
        href: "/services/construction-materials",
      },
      {
        name: "Agro Industry",
        href: "/services/agro-industry",
      },
      {
        name: "Import & Export",
        href: "/services/import-export",
      },
      {
        name: "Education",
        href: "/services/education",
      },
      {
        name: "IT Services",
        href: "/services/it-services",
      },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [servicesOpen, setServicesOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] =
    useState(false);

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
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                TG
              </span>
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-xl font-bold transition-colors ${
                  isScrolled
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                Target Group
              </p>
              <p
                className={`text-xs -mt-1 transition-colors ${
                  isScrolled
                    ? "text-gray-500"
                    : "text-gray-300"
                }`}
              >
                PLC
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    setServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    setServicesOpen(false)
                  }
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-base font-semibold transition-colors py-2 ${
                      isScrolled
                        ? "text-gray-800 hover:text-primary-600"
                        : "text-white hover:text-primary-300"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 mt-1">
                      {item.children.map(
                        (child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {child.name}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-semibold transition-colors ${
                    isScrolled
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
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-semibold text-gray-800 hover:text-primary-600"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1 border-l-2 border-primary-100 ml-2">
                      {item.children.map(
                        (child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block py-2 text-sm font-medium text-gray-600 hover:text-primary-600"
                            onClick={() =>
                              setMobileMenuOpen(
                                false
                              )
                            }
                          >
                            {child.name}
                          </Link>
                        )
                      )}
                    </div>
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
