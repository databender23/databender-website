"use client";

import Link from "next/link";
import ComposeForm from "./components/ComposeForm";

export default function ComposePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cold-outreach"
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
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Compose Email
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Send a high-touch email with tracking
            </p>
          </div>
        </div>
      </div>

      {/* Compose form */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 max-w-3xl">
        <ComposeForm />
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 max-w-3xl">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Tips for effective outreach</h3>
        <ul className="text-sm text-blue-800 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">-</span>
            <span>Personalize beyond just the name - reference something specific about their company</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">-</span>
            <span>Keep it concise - aim for 3-4 short paragraphs maximum</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">-</span>
            <span>Include a clear, low-friction call to action</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">-</span>
            <span>Tracking helps you understand engagement - opens and clicks are recorded in the lead record</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
