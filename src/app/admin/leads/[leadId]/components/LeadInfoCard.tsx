"use client";

import type { Lead } from "@/lib/leads/types";

interface LeadInfoCardProps {
  lead: Lead;
}

function formatFormType(formType: string): string {
  const labels: Record<string, string> = {
    contact: "Contact Form",
    guide: "Guide Download",
    audit: "Free Audit Request",
    assessment: "Assessment",
    chat: "Chat Conversation",
    newsletter: "Newsletter Signup",
  };
  return labels[formType] || formType;
}

export default function LeadInfoCard({ lead }: LeadInfoCardProps) {
  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Contact Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>
              <p className="text-sm text-text-muted">Name</p>
              <p className="text-text-primary font-medium">
                {lead.firstName} {lead.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0"
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
            <div>
              <p className="text-sm text-text-muted">Email</p>
              <a
                href={`mailto:${lead.email}`}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                {lead.email}
              </a>
            </div>
          </div>

          {(lead.company || lead.identifiedCompany) && (
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div>
                <p className="text-sm text-text-muted">Company</p>
                <p className="text-text-primary font-medium">
                  {lead.company || lead.identifiedCompany}
                </p>
                {lead.identifiedDomain && (
                  <p className="text-xs text-text-muted">{lead.identifiedDomain}</p>
                )}
              </div>
            </div>
          )}

          {lead.phone && (
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0"
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
              <div>
                <p className="text-sm text-text-muted">Phone</p>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-teal-500 hover:text-teal-600 font-medium"
                >
                  {lead.phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Submission Card */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Form Submission
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text-muted">Type</p>
            <p className="text-text-primary font-medium">
              {formatFormType(lead.formType)}
            </p>
          </div>

          {lead.resourceTitle && (
            <div>
              <p className="text-sm text-text-muted">Resource</p>
              <p className="text-text-primary font-medium">{lead.resourceTitle}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-text-muted">Source Page</p>
            <p className="text-text-primary font-medium text-sm break-all">
              {lead.sourcePage}
            </p>
          </div>

          {lead.message && (
            <div>
              <p className="text-sm text-text-muted mb-1">Message</p>
              <p className="text-text-secondary text-sm bg-bg-secondary rounded-md p-3">
                {lead.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Data Card */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Analytics Data
        </h3>
        <div className="space-y-3">
          {lead.behaviorScore !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Behavior Score</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-text-primary">
                  {lead.behaviorScore}
                </span>
                {lead.behaviorTier && (
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      lead.behaviorTier === "Very Hot"
                        ? "bg-red-100 text-red-700"
                        : lead.behaviorTier === "Hot"
                        ? "bg-orange-100 text-orange-700"
                        : lead.behaviorTier === "Warm"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lead.behaviorTier}
                  </span>
                )}
              </div>
            </div>
          )}

          {lead.pagesVisited && lead.pagesVisited.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Pages Visited</span>
              <span className="text-text-primary font-medium">
                {lead.pagesVisited.length}
              </span>
            </div>
          )}

          {lead.firstVisitDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Returning Visitor</span>
              <span className="text-text-primary font-medium">
                {new Date(lead.firstVisitDate) < new Date(lead.createdAt)
                  ? "Yes"
                  : "No"}
              </span>
            </div>
          )}

          {lead.assessmentTier && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Assessment Tier</span>
              <span className="text-text-primary font-medium">
                {lead.assessmentTier}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Attribution Card */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-6">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
          Attribution
        </h3>
        <div className="space-y-3">
          {(lead.utmSource || lead.referrerSource || lead.firstTouchSource) && (
            <div>
              <p className="text-sm text-text-muted">Source</p>
              <p className="text-text-primary font-medium capitalize">
                {lead.utmSource || lead.referrerSource || lead.firstTouchSource || "Direct"}
              </p>
            </div>
          )}

          {lead.utmMedium && (
            <div>
              <p className="text-sm text-text-muted">Medium</p>
              <p className="text-text-primary font-medium capitalize">
                {lead.utmMedium}
              </p>
            </div>
          )}

          {lead.utmCampaign && (
            <div>
              <p className="text-sm text-text-muted">Campaign</p>
              <p className="text-text-primary font-medium">{lead.utmCampaign}</p>
            </div>
          )}

          {lead.firstTouchLandingPage && (
            <div>
              <p className="text-sm text-text-muted">Landing Page</p>
              <p className="text-text-primary font-medium text-sm break-all">
                {lead.firstTouchLandingPage}
              </p>
            </div>
          )}

          {!lead.utmSource &&
            !lead.referrerSource &&
            !lead.firstTouchSource &&
            !lead.utmCampaign && (
              <p className="text-text-muted text-sm">No attribution data available</p>
            )}
        </div>
      </div>
    </div>
  );
}
