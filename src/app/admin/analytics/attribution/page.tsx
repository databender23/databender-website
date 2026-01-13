"use client";

import AttributionReport from "../components/AttributionReport";

export default function AttributionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <a
          href="/admin/analytics"
          className="text-sm text-teal-500 hover:text-teal-600 hover:underline"
        >
          &larr; Back to Dashboard
        </a>
      </div>
      <AttributionReport />
    </div>
  );
}
