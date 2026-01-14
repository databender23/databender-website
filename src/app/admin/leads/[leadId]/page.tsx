"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead, LeadNote, ContactRecord } from "@/lib/leads/types";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadStatusControls from "./components/LeadStatusControls";
import LeadNotes from "./components/LeadNotes";
import LeadJourney from "./components/LeadJourney";
import LeadContactHistory from "./components/LeadContactHistory";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchLead = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Lead not found");
        }
        throw new Error("Failed to fetch lead");
      }
      const data = await response.json();
      setLead(data.lead);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lead");
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleUpdate = async (updates: Partial<Lead>) => {
    if (!lead) return;
    setUpdateError("");

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update lead");
      }

      const data = await response.json();
      setLead(data.lead);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Failed to update lead");
      // Re-throw to let the control component know the update failed
      throw err;
    }
  };

  const handleNoteAdded = (note: LeadNote) => {
    if (!lead) return;
    setLead({
      ...lead,
      notes: [...(lead.notes || []), note],
    });
  };

  const handleContactAdded = (contact: ContactRecord) => {
    if (!lead) return;
    setLead({
      ...lead,
      contactHistory: [...(lead.contactHistory || []), contact],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Leads
        </Link>
        <div className="bg-error/10 text-error p-4 rounded-lg">
          {error}
        </div>
        <button
          onClick={() => router.push("/admin/leads")}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
        >
          Return to Leads List
        </button>
      </div>
    );
  }

  if (!lead) {
    return null;
  }

  const displayName = `${lead.firstName} ${lead.lastName}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Leads
          </Link>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-2xl font-bold text-text-primary">
            Lead: {displayName}
          </h1>
        </div>
      </div>

      {/* Update Error Alert */}
      {updateError && (
        <div className="bg-error/10 text-error p-4 rounded-lg flex items-center justify-between">
          <span>{updateError}</span>
          <button
            onClick={() => setUpdateError("")}
            className="text-error hover:text-error/80"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <LeadInfoCard lead={lead} />
          <LeadContactHistory
            leadId={leadId}
            contactHistory={lead.contactHistory || []}
            onContactAdded={handleContactAdded}
          />
          <LeadJourney
            pageJourney={lead.pageJourney}
            pagesVisited={lead.pagesVisited}
          />
          <LeadNotes
            leadId={leadId}
            notes={lead.notes || []}
            onNoteAdded={handleNoteAdded}
          />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="lg:col-span-1">
          <LeadStatusControls lead={lead} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
