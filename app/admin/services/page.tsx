"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  icon: string | null;
  order: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<
    Service[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(
        "/api/admin/services"
      );
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(
        "Failed to fetch services:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this service?"
      )
    )
      return;

    try {
      await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      fetchServices();
    } catch (error) {
      console.error(
        "Failed to delete service:",
        error
      );
    }
  };

  const toggleActive = async (
    service: Service
  ) => {
    try {
      await fetch(
        `/api/admin/services/${service.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !service.isActive,
          }),
        }
      );
      fetchServices();
    } catch (error) {
      console.error(
        "Failed to update service:",
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
            Services
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your business services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </Link>
      </div>

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
          >
            {/* Mobile: Stack layout, Desktop: Horizontal layout */}
            <div className="flex flex-col lg:flex-row sm:items-center gap-4">
              {/* Image */}
              {service.image && (
                <div className="relative w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 sm:truncate">
                  {service.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Order: {service.order} | Slug:{" "}
                  {service.slug}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Status Badge */}
                <button
                  onClick={() =>
                    toggleActive(service)
                  }
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    service.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {service.isActive ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">
                        Active
                      </span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">
                        Hidden
                      </span>
                    </>
                  )}
                </button>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/services/${service.id}/manage`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Manage Items & Benefits"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit Service"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(service.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            No services yet. Click &quot;Add
            Service&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
}
