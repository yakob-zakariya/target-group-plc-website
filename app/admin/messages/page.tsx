"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Eye,
  Trash2,
  Archive,
  CheckCircle,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type MessageStatus =
  | "NEW"
  | "READ"
  | "REPLIED"
  | "ARCHIVED";

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  notes: string | null;
  createdAt: string;
}

const statusColors: Record<
  MessageStatus,
  string
> = {
  NEW: "bg-blue-100 text-blue-800",
  READ: "bg-yellow-100 text-yellow-800",
  REPLIED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<
  MessageStatus,
  string
> = {
  NEW: "New",
  READ: "Read",
  REPLIED: "Replied",
  ARCHIVED: "Archived",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<
    ContactMessage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<
    MessageStatus | "ALL"
  >("ALL");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "/api/admin/messages"
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(
        "Failed to fetch messages:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: MessageStatus
  ) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status } : m
        )
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, status } : null
        );
      }
    } catch (error) {
      console.error(
        "Failed to update status:",
        error
      );
    }
  };

  const deleteMessage = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this message?"
      )
    )
      return;
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      setMessages((prev) =>
        prev.filter((m) => m.id !== id)
      );
      if (selectedMessage?.id === id)
        setSelectedMessage(null);
    } catch (error) {
      console.error(
        "Failed to delete message:",
        error
      );
    }
  };

  const viewMessage = (
    message: ContactMessage
  ) => {
    setSelectedMessage(message);
    if (message.status === "NEW") {
      updateStatus(message.id, "READ");
    }
  };

  const filteredMessages =
    filter === "ALL"
      ? messages
      : messages.filter(
          (m) => m.status === filter
        );
  const newCount = messages.filter(
    (m) => m.status === "NEW"
  ).length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-primary-600" />
            Contact Messages
            {newCount > 0 && (
              <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {newCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage messages from your website
            visitors
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            "ALL",
            "NEW",
            "READ",
            "REPLIED",
            "ARCHIVED",
          ] as const
        ).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status === "ALL"
              ? "All"
              : statusLabels[status]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages list */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() =>
                    viewMessage(message)
                  }
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id ===
                    message.id
                      ? "bg-primary-50"
                      : ""
                  } ${
                    message.status === "NEW"
                      ? "bg-blue-50/50"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 truncate">
                          {message.firstName}{" "}
                          {message.lastName}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            statusColors[
                              message.status
                            ]
                          }`}
                        >
                          {
                            statusLabels[
                              message.status
                            ]
                          }
                        </span>
                      </div>
                      <p className="text-sm text-primary-600 font-medium">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {message.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(
                        message.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedMessage ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedMessage.firstName}{" "}
                    {selectedMessage.lastName}
                  </h2>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                      statusColors[
                        selectedMessage.status
                      ]
                    }`}
                  >
                    {
                      statusLabels[
                        selectedMessage.status
                      ]
                    }
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedMessage.id,
                        "REPLIED"
                      )
                    }
                    title="Mark as Replied"
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedMessage.id,
                        "ARCHIVED"
                      )
                    }
                    title="Archive"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      deleteMessage(
                        selectedMessage.id
                      )
                    }
                    title="Delete"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {new Date(
                    selectedMessage.createdAt
                  ).toLocaleString()}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />{" "}
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>
                  Select a message to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
