"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<
    HeroSlide[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch(
        "/api/admin/hero-slides"
      );
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      console.error(
        "Failed to fetch slides:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this slide?"
      )
    )
      return;

    try {
      await fetch(
        `/api/admin/hero-slides/${id}`,
        { method: "DELETE" }
      );
      fetchSlides();
    } catch (error) {
      console.error(
        "Failed to delete slide:",
        error
      );
    }
  };

  const toggleActive = async (
    slide: HeroSlide
  ) => {
    try {
      await fetch(
        `/api/admin/hero-slides/${slide.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !slide.isActive,
          }),
        }
      );
      fetchSlides();
    } catch (error) {
      console.error(
        "Failed to update slide:",
        error
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Hero Slides
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage the homepage hero carousel
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Slide
        </Link>
      </div>

      {/* Slides List - Card Layout for all screens */}
      <div className="grid gap-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Order & Image */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <GripVertical className="w-5 h-5 cursor-grab" />
                  <span className="text-gray-900 font-medium">
                    #{slide.order}
                  </span>
                </div>
                <div className="relative w-24 sm:w-32 h-16 sm:h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">
                  {slide.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 sm:truncate">
                  {slide.subtitle}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <button
                  onClick={() =>
                    toggleActive(slide)
                  }
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    slide.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {slide.isActive ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/hero-slides/${slide.id}/edit`}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit Slide"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(slide.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            No hero slides yet. Click &quot;Add
            Slide&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
}
