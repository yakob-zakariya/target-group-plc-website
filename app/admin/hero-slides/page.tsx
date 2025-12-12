"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";

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
  const [showModal, setShowModal] =
    useState(false);
  const [editingSlide, setEditingSlide] =
    useState<HeroSlide | null>(null);

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hero Slides
          </h1>
          <p className="text-gray-600 mt-1">
            Manage the homepage hero carousel
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSlide(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Slide
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slides.map((slide) => (
              <tr
                key={slide.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical className="w-5 h-5 cursor-grab" />
                    <span className="text-gray-900 font-medium">
                      {slide.order}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-20 h-12 rounded overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {slide.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {slide.subtitle}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      toggleActive(slide)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      slide.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {slide.isActive ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />{" "}
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />{" "}
                        Hidden
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingSlide(slide);
                        setShowModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(slide.id)
                      }
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {slides.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hero slides yet. Click &quot;Add
            Slide&quot; to create one.
          </div>
        )}
      </div>

      {showModal && (
        <SlideModal
          slide={editingSlide}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchSlides();
          }}
        />
      )}
    </div>
  );
}

function SlideModal({
  slide,
  onClose,
  onSave,
}: {
  slide: HeroSlide | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    title: slide?.title || "",
    subtitle: slide?.subtitle || "",
    image: slide?.image || "",
    buttonText: slide?.buttonText || "",
    buttonLink: slide?.buttonLink || "",
    order: slide?.order || 1,
    isActive: slide?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = slide
        ? `/api/admin/hero-slides/${slide.id}`
        : "/api/admin/hero-slides";
      const method = slide ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      onSave();
    } catch (error) {
      console.error(
        "Failed to save slide:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {slide
              ? "Edit Slide"
              : "Add New Slide"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <textarea
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subtitle: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="/images/hero/slide.jpg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttonText: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Link
              </label>
              <input
                type="text"
                value={formData.buttonLink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttonLink: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="/services"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(
                      e.target.value
                    ),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min={1}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active
                </span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
