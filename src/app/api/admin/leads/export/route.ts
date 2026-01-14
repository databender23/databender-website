import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { exportLeads } from "@/lib/leads/lead-service";
import type { Lead, LeadStatus, ContactChannel } from "@/lib/leads/types";

// CSV field definitions for export
const CSV_FIELDS: { key: keyof Lead | string; header: string }[] = [
  { key: "leadId", header: "Lead ID" },
  { key: "email", header: "Email" },
  { key: "firstName", header: "First Name" },
  { key: "lastName", header: "Last Name" },
  { key: "company", header: "Company" },
  { key: "phone", header: "Phone" },
  { key: "status", header: "Status" },
  { key: "tier", header: "Tier" },
  { key: "industry", header: "Industry" },
  { key: "formType", header: "Form Type" },
  { key: "resourceTitle", header: "Resource" },
  { key: "sourcePage", header: "Source Page" },
  { key: "behaviorScore", header: "Behavior Score" },
  { key: "behaviorTier", header: "Behavior Tier" },
  { key: "identifiedCompany", header: "Identified Company" },
  { key: "identifiedIndustry", header: "Identified Industry" },
  { key: "utmSource", header: "UTM Source" },
  { key: "utmMedium", header: "UTM Medium" },
  { key: "utmCampaign", header: "UTM Campaign" },
  { key: "referrerSource", header: "Referrer Source" },
  { key: "assignedTo", header: "Assigned To" },
  { key: "contactedViaLinkedin", header: "Contacted Via LinkedIn" },
  { key: "contactedViaEmail", header: "Contacted Via Email" },
  { key: "lastContactDate", header: "Last Contact Date" },
  { key: "lastContactChannel", header: "Last Contact Channel" },
  { key: "createdAt", header: "Created At" },
  { key: "updatedAt", header: "Updated At" },
  { key: "message", header: "Message" },
];

/**
 * Check if a lead has been contacted via a specific channel
 */
function hasBeenContactedVia(lead: Lead, channel: ContactChannel): boolean {
  if (!lead.contactHistory || lead.contactHistory.length === 0) {
    return false;
  }
  return lead.contactHistory.some((record) => record.channel === channel);
}

/**
 * Get the most recent contact record for a lead
 */
function getLastContact(lead: Lead): { date: string; channel: string } | null {
  if (!lead.contactHistory || lead.contactHistory.length === 0) {
    return null;
  }
  const sorted = [...lead.contactHistory].sort(
    (a, b) => new Date(b.contactedAt).getTime() - new Date(a.contactedAt).getTime()
  );
  return {
    date: sorted[0].contactedAt,
    channel: sorted[0].channel,
  };
}

/**
 * Filter leads based on contact history criteria
 */
function filterLeadsByContactHistory(
  leads: Lead[],
  options: {
    notContacted?: boolean;
    excludeContactedVia?: ContactChannel[];
    contactedVia?: ContactChannel[];
  }
): Lead[] {
  return leads.filter((lead) => {
    const hasContactHistory = lead.contactHistory && lead.contactHistory.length > 0;

    // Filter: Only leads with no contact history
    if (options.notContacted) {
      if (hasContactHistory) {
        return false;
      }
    }

    // Filter: Exclude leads contacted via specific channels
    if (options.excludeContactedVia && options.excludeContactedVia.length > 0) {
      for (const channel of options.excludeContactedVia) {
        if (hasBeenContactedVia(lead, channel)) {
          return false;
        }
      }
    }

    // Filter: Only include leads contacted via specific channels
    if (options.contactedVia && options.contactedVia.length > 0) {
      const hasAnyRequiredChannel = options.contactedVia.some((channel) =>
        hasBeenContactedVia(lead, channel)
      );
      if (!hasAnyRequiredChannel) {
        return false;
      }
    }

    return true;
  });
}

function escapeCSVField(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  const strValue = String(value);

  // If the value contains commas, quotes, or newlines, wrap in quotes and escape internal quotes
  if (strValue.includes(",") || strValue.includes('"') || strValue.includes("\n")) {
    return `"${strValue.replace(/"/g, '""')}"`;
  }

  return strValue;
}

/**
 * Get the value for a CSV field, including computed contact history fields
 */
function getFieldValue(lead: Lead, fieldKey: string): unknown {
  // Handle computed contact history fields
  switch (fieldKey) {
    case "contactedViaLinkedin":
      return hasBeenContactedVia(lead, "linkedin") ? "Yes" : "No";
    case "contactedViaEmail":
      return hasBeenContactedVia(lead, "email") ? "Yes" : "No";
    case "lastContactDate": {
      const lastContact = getLastContact(lead);
      return lastContact ? lastContact.date : "";
    }
    case "lastContactChannel": {
      const lastContact = getLastContact(lead);
      return lastContact ? lastContact.channel : "";
    }
    default:
      return lead[fieldKey as keyof Lead];
  }
}

function generateCSV(leads: Lead[]): string {
  // Header row
  const headers = CSV_FIELDS.map((f) => f.header).join(",");

  // Data rows
  const rows = leads.map((lead) => {
    return CSV_FIELDS.map((field) => {
      const value = getFieldValue(lead, field.key);
      return escapeCSVField(value);
    }).join(",");
  });

  return [headers, ...rows].join("\n");
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  try {
    const format = searchParams.get("format") || "json";

    if (format !== "csv" && format !== "json") {
      return NextResponse.json(
        { error: "Invalid format. Must be 'csv' or 'json'" },
        { status: 400 }
      );
    }

    const params = {
      status: searchParams.get("status") as LeadStatus | undefined,
      tier: searchParams.get("tier") || undefined,
      industry: searchParams.get("industry") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      minScore: searchParams.get("minScore")
        ? parseInt(searchParams.get("minScore")!, 10)
        : undefined,
    };

    // Parse contact history filter parameters
    const notContacted = searchParams.get("notContacted") === "true";
    const excludeContactedViaParam = searchParams.get("excludeContactedVia");
    const contactedViaParam = searchParams.get("contactedVia");

    const excludeContactedVia = excludeContactedViaParam
      ? (excludeContactedViaParam.split(",") as ContactChannel[])
      : undefined;
    const contactedVia = contactedViaParam
      ? (contactedViaParam.split(",") as ContactChannel[])
      : undefined;

    let leads = await exportLeads(params);

    // Apply contact history filtering
    if (notContacted || excludeContactedVia || contactedVia) {
      leads = filterLeadsByContactHistory(leads, {
        notContacted,
        excludeContactedVia,
        contactedVia,
      });
    }

    // Generate filename with date
    const date = new Date().toISOString().split("T")[0];
    const filename = `leads-export-${date}.${format}`;

    if (format === "csv") {
      const csv = generateCSV(leads);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // JSON format
    return new NextResponse(JSON.stringify(leads, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting leads:", error);
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}
