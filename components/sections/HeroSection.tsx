"use client";

import {
  useState,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  buttonText: string | null;
  buttonLink: string | null;
  order: number;
  isActive: boolean;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<
    HeroSlide[]
  >([]);
  const [currentSlide, setCurrentSlide] =
    useState(0);
  const [isAutoPlaying, setIsAutoPlaying] =
    useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "/api/admin/hero-slides"
        );
        const data = await res.json();
        // Only show active slides
        const activeSlides = data.filter(
          (s: HeroSlide) => s.isActive
        );
        setSlides(activeSlides);
      } catch (error) {
        console.error(
          "Failed to fetch slides:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(
      () => setIsAutoPlaying(true),
      10000
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Show loading spinner while loading
  if (loading || slides.length === 0) {
    return (
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <LoadingSpinner
          size="lg"
          text="Loading..."
        />
      </section>
    );
  }

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute"
                }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                      {slide.title}
                    </h1>

                    {slide.subtitle && (
                      <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                        {slide.subtitle}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.buttonText &&
                        slide.buttonLink && (
                          <Button
                            href={
                              slide.buttonLink
                            }
                            size="lg"
                          >
                            {slide.buttonText}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        )}
                      <Button
                        href="/about"
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white/10"
                      >
                        Learn About Us
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/70 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/70 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-10 h-3 bg-primary-500 rounded-full"
                : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${
              index + 1
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-primary-500 transition-all duration-300"
          style={{
            width: `${
              ((currentSlide + 1) /
                slides.length) *
              100
            }%`,
          }}
        />
      </div>
    </section>
  );
}
