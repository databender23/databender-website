"use client";

import { useState } from "react";
import type { ContactChannel, ContactRecord } from "@/lib/leads/types";

interface LeadContactHistoryProps {
  leadId: string;
  contactHistory: ContactRecord[];
  onContactAdded: (record: ContactRecord) => void;
}

const CHANNEL_OPTIONS: { value: ContactChannel; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "other", label: "Other" },
];

function formatContactDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ChannelIcon({ channel }: { channel: ContactChannel }) {
  switch (channel) {
    case "linkedin":
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "email":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "phone":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      );
  }
}

function getChannelColor(channel: ContactChannel): string {
  switch (channel) {
    case "linkedin":
      return "text-[#0A66C2] bg-[#0A66C2]/10";
    case "email":
      return "text-teal-600 bg-teal-100";
    case "phone":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export default function LeadContactHistory({
  leadId,
  contactHistory,
  onContactAdded,
}: LeadContactHistoryProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [channel, setChannel] = useState<ContactChannel>("linkedin");
  const [campaign, setCampaign] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          campaign: campaign.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to record contact");
      }

      const data = await response.json();
      onContactAdded(data.contact);

      // Reset form
      setChannel("linkedin");
      setCampaign("");
      setNotes("");
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedContacts = [...contactHistory].sort(
    (a, b) =>
      new Date(b.contactedAt).getTime() - new Date(a.contactedAt).getTime()
  );

  return (
    <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">
          Contact History
        </h3>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Record Contact
          </button>
        )}
      </div>

      {/* Add Contact Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-bg-secondary rounded-lg border border-border"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as ContactChannel)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              >
                {CHANNEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Campaign (optional)
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="e.g., Q1-Legal-Outreach"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any relevant notes about this contact..."
                rows={2}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setError("");
                }}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  "Save Contact"
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Contact History Timeline */}
      {sortedContacts.length === 0 ? (
        <p className="text-text-muted text-sm text-center py-4">
          No contact history yet.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedContacts.map((contact) => (
            <div key={contact.id} className="flex gap-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getChannelColor(contact.channel)}`}
              >
                <ChannelIcon channel={contact.channel} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-text-primary capitalize">
                    {contact.channel}
                  </span>
                  {contact.campaign && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {contact.campaign}
                    </span>
                  )}
                  <span className="text-xs text-text-muted">
                    {formatContactDate(contact.contactedAt)}
                  </span>
                </div>
                {contact.notes && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {contact.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
