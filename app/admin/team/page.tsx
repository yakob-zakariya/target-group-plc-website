"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  order: number;
  isActive: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<
    TeamMember[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(
        "/api/admin/team-members"
      );
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(
        "Failed to fetch team members:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this team member?"
      )
    )
      return;

    try {
      await fetch(
        `/api/admin/team-members/${id}`,
        { method: "DELETE" }
      );
      fetchMembers();
    } catch (error) {
      console.error(
        "Failed to delete member:",
        error
      );
    }
  };

  const toggleActive = async (
    member: TeamMember
  ) => {
    try {
      await fetch(
        `/api/admin/team-members/${member.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !member.isActive,
          }),
        }
      );
      fetchMembers();
    } catch (error) {
      console.error(
        "Failed to update member:",
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
            Team Members
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your team
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </Link>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="relative h-48 bg-gray-100">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-primary-600">
                {member.role}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Order: {member.order}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() =>
                    toggleActive(member)
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    member.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {member.isActive ? (
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
                <div className="flex gap-1">
                  <Link
                    href={`/admin/team/${member.id}/edit`}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(member.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {members.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
          No team members yet. Click &quot;Add
          Member&quot; to create one.
        </div>
      )}
    </div>
  );
}
