"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Package,
  CheckCircle,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface ServiceItem {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
}

interface ServiceBenefit {
  id: string;
  text: string;
  order: number;
  isActive: boolean;
}

interface Service {
  id: string;
  name: string;
  slug: string;
}

export default function ManageServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [service, setService] =
    useState<Service | null>(null);
  const [items, setItems] = useState<
    ServiceItem[]
  >([]);
  const [benefits, setBenefits] = useState<
    ServiceBenefit[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "items" | "benefits"
  >("items");

  // Item form state
  const [showItemForm, setShowItemForm] =
    useState(false);
  const [editingItem, setEditingItem] =
    useState<ServiceItem | null>(null);
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    image: "",
    order: 0,
    isActive: true,
  });

  // Benefit form state
  const [showBenefitForm, setShowBenefitForm] =
    useState(false);
  const [editingBenefit, setEditingBenefit] =
    useState<ServiceBenefit | null>(null);
  const [benefitForm, setBenefitForm] = useState({
    text: "",
    order: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const [serviceRes, itemsRes, benefitsRes] =
        await Promise.all([
          fetch(`/api/admin/services/${id}`),
          fetch(
            `/api/admin/services/${id}/items`
          ),
          fetch(
            `/api/admin/services/${id}/benefits`
          ),
        ]);

      if (serviceRes.ok)
        setService(await serviceRes.json());
      if (itemsRes.ok)
        setItems(await itemsRes.json());
      if (benefitsRes.ok)
        setBenefits(await benefitsRes.json());
    } catch (error) {
      console.error(
        "Failed to fetch data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSaveItem = async () => {
    const url = editingItem
      ? `/api/admin/services/${id}/items/${editingItem.id}`
      : `/api/admin/services/${id}/items`;
    const method = editingItem ? "PATCH" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemForm),
    });

    setShowItemForm(false);
    setEditingItem(null);
    setItemForm({
      name: "",
      description: "",
      image: "",
      order: 0,
      isActive: true,
    });
    fetchData();
  };

  const handleDeleteItem = async (
    itemId: string
  ) => {
    if (!confirm("Delete this item?")) return;
    await fetch(
      `/api/admin/services/${id}/items/${itemId}`,
      { method: "DELETE" }
    );
    fetchData();
  };

  const handleSaveBenefit = async () => {
    const url = editingBenefit
      ? `/api/admin/services/${id}/benefits/${editingBenefit.id}`
      : `/api/admin/services/${id}/benefits`;
    const method = editingBenefit
      ? "PATCH"
      : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(benefitForm),
    });

    setShowBenefitForm(false);
    setEditingBenefit(null);
    setBenefitForm({
      text: "",
      order: 0,
      isActive: true,
    });
    fetchData();
  };

  const handleDeleteBenefit = async (
    benefitId: string
  ) => {
    if (!confirm("Delete this benefit?")) return;
    await fetch(
      `/api/admin/services/${id}/benefits/${benefitId}`,
      { method: "DELETE" }
    );
    fetchData();
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
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Manage: {service?.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Add and edit the items and benefits
          shown on the service page
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("items")}
          className={`pb-3 px-1 font-medium flex items-center gap-2 ${
            activeTab === "items"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          <Package className="w-5 h-5" />
          What We Offer ({items.length})
        </button>
        <button
          onClick={() => setActiveTab("benefits")}
          className={`pb-3 px-1 font-medium flex items-center gap-2 ${
            activeTab === "benefits"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          Why Choose Us ({benefits.length})
        </button>
      </div>

      {/* Items Tab */}
      {activeTab === "items" && (
        <div>
          <button
            onClick={() => {
              setShowItemForm(true);
              setEditingItem(null);
              setItemForm({
                name: "",
                description: "",
                image: "",
                order: items.length,
                isActive: true,
              });
            }}
            className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Item
          </button>

          {showItemForm && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingItem
                  ? "Edit Item"
                  : "Add Item"}
              </h3>
              <div className="space-y-4">
                <ImageUpload
                  value={itemForm.image}
                  onChange={(url) =>
                    setItemForm({
                      ...itemForm,
                      image: url,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Item name *"
                  value={itemForm.name}
                  onChange={(e) =>
                    setItemForm({
                      ...itemForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={itemForm.description}
                  onChange={(e) =>
                    setItemForm({
                      ...itemForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Order"
                    value={itemForm.order}
                    onChange={(e) =>
                      setItemForm({
                        ...itemForm,
                        order: parseInt(
                          e.target.value
                        ),
                      })
                    }
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemForm.isActive}
                      onChange={(e) =>
                        setItemForm({
                          ...itemForm,
                          isActive:
                            e.target.checked,
                        })
                      }
                    />
                    Active
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowItemForm(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveItem}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.isActive
                    ? "Active"
                    : "Hidden"}
                </span>
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setItemForm({
                      name: item.name,
                      description:
                        item.description || "",
                      image: item.image || "",
                      order: item.order,
                      isActive: item.isActive,
                    });
                    setShowItemForm(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    handleDeleteItem(item.id)
                  }
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No items yet. Add your first item
                above.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Benefits Tab */}
      {activeTab === "benefits" && (
        <div>
          <button
            onClick={() => {
              setShowBenefitForm(true);
              setEditingBenefit(null);
              setBenefitForm({
                text: "",
                order: benefits.length,
                isActive: true,
              });
            }}
            className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add
            Benefit
          </button>

          {showBenefitForm && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingBenefit
                  ? "Edit Benefit"
                  : "Add Benefit"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Benefit text *"
                  value={benefitForm.text}
                  onChange={(e) =>
                    setBenefitForm({
                      ...benefitForm,
                      text: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Order"
                    value={benefitForm.order}
                    onChange={(e) =>
                      setBenefitForm({
                        ...benefitForm,
                        order: parseInt(
                          e.target.value
                        ),
                      })
                    }
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={
                        benefitForm.isActive
                      }
                      onChange={(e) =>
                        setBenefitForm({
                          ...benefitForm,
                          isActive:
                            e.target.checked,
                        })
                      }
                    />
                    Active
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowBenefitForm(false);
                      setEditingBenefit(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBenefit}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
              >
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span className="flex-1">
                  {benefit.text}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    benefit.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {benefit.isActive
                    ? "Active"
                    : "Hidden"}
                </span>
                <button
                  onClick={() => {
                    setEditingBenefit(benefit);
                    setBenefitForm({
                      text: benefit.text,
                      order: benefit.order,
                      isActive: benefit.isActive,
                    });
                    setShowBenefitForm(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    handleDeleteBenefit(
                      benefit.id
                    )
                  }
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {benefits.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No benefits yet. Add your first
                benefit above.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
