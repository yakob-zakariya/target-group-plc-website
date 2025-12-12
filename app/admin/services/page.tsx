"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";

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
  const [showModal, setShowModal] =
    useState(false);
  const [editingService, setEditingService] =
    useState<Service | null>(null);

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
            Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your business services
          </p>
        </div>
        <button
          onClick={() => {
            setEditingService(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6"
          >
            {service.image && (
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {service.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Order: {service.order} | Slug:{" "}
                {service.slug}
              </p>
            </div>
            <button
              onClick={() =>
                toggleActive(service)
              }
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                service.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {service.isActive ? (
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
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditingService(service);
                  setShowModal(true);
                }}
                className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  handleDelete(service.id)
                }
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
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

      {showModal && (
        <ServiceModal
          service={editingService}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchServices();
          }}
        />
      )}
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
  onSave,
}: {
  service: Service | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    image: service?.image || "",
    icon: service?.icon || "",
    order: service?.order || 1,
    isActive: service?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = service
        ? `/api/admin/services/${service.id}`
        : "/api/admin/services";
      const method = service ? "PATCH" : "POST";

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
        "Failed to save service:",
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
            {service
              ? "Edit Service"
              : "Add New Service"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
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
              placeholder="/images/services/service.jpg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Lucide name)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    icon: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Building2"
              />
            </div>
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
