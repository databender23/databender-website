import { v4 as uuidv4 } from "uuid";
import {
  putLead,
  getLead,
  getLeadByEmail,
  queryLeadsByStatus,
  scanLeads,
  updateLead,
  addLeadNote,
  addContactRecord,
} from "./dynamodb";
import { getSessionsForDateRange } from "../analytics/dynamodb";
import type {
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  LeadQueryParams,
  LeadQueryResult,
  LeadStats,
  LeadNote,
  LeadStatus,
  LeadFormType,
  LeadSource,
  BehaviorTier,
  ContactChannel,
  ContactRecord,
} from "./types";
import type { Session } from "../analytics/events";

/**
 * Create a new lead or update existing lead by email
 */
export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const now = new Date().toISOString();
  const email = input.email.toLowerCase();

  // Check for existing lead by email
  const existingLead = await getLeadByEmail(email);

  if (existingLead) {
    // Update existing lead with new form submission data
    const updates: Partial<Lead> = {
      // Update contact info if provided
      ...(input.firstName && { firstName: input.firstName }),
      ...(input.lastName && { lastName: input.lastName }),
      ...(input.company && { company: input.company }),
      ...(input.phone && { phone: input.phone }),
      ...(input.message && { message: input.message }),
      // Update analytics data if provided
      ...(input.visitorId && { visitorId: input.visitorId }),
      ...(input.sessionId && { sessionId: input.sessionId }),
      ...(input.behaviorScore && { behaviorScore: input.behaviorScore }),
      ...(input.behaviorTier && { behaviorTier: input.behaviorTier }),
      ...(input.pagesVisited && { pagesVisited: input.pagesVisited }),
      ...(input.pageJourney && { pageJourney: input.pageJourney }),
      // Update company identification
      ...(input.identifiedCompany && {
        identifiedCompany: input.identifiedCompany,
      }),
      ...(input.identifiedDomain && {
        identifiedDomain: input.identifiedDomain,
      }),
      ...(input.identifiedIndustry && {
        identifiedIndustry: input.identifiedIndustry,
      }),
      // Update assessment data if provided
      ...(input.assessmentScores && {
        assessmentScores: input.assessmentScores,
      }),
      ...(input.assessmentTier && { assessmentTier: input.assessmentTier }),
      // Update lead source if provided (for re-imports)
      ...(input.leadSource && { leadSource: input.leadSource }),
      lastActivityAt: now,
    };

    await updateLead(existingLead.email, existingLead.createdAt, updates);

    return {
      ...existingLead,
      ...updates,
      updatedAt: now,
    };
  }

  // Create new lead
  const leadId = uuidv4();
  const pk = `LEAD#${email}`;
  const sk = `#CREATED#${now}`;

  const lead: Lead = {
    pk,
    sk,
    leadId,
    email,
    firstName: input.firstName,
    lastName: input.lastName,
    company: input.company,
    phone: input.phone,
    message: input.message,
    formType: input.formType,
    resourceSlug: input.resourceSlug,
    resourceTitle: input.resourceTitle,
    sourcePage: input.sourcePage,
    visitorId: input.visitorId,
    sessionId: input.sessionId,
    behaviorScore: input.behaviorScore,
    behaviorTier: input.behaviorTier,
    pagesVisited: input.pagesVisited,
    pageJourney: input.pageJourney,
    identifiedCompany: input.identifiedCompany,
    identifiedDomain: input.identifiedDomain,
    identifiedIndustry: input.identifiedIndustry,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmTerm: input.utmTerm,
    utmContent: input.utmContent,
    referrerSource: input.referrerSource,
    referrerMedium: input.referrerMedium,
    firstTouchSource: input.firstTouchSource,
    firstTouchLandingPage: input.firstTouchLandingPage,
    firstVisitDate: input.firstVisitDate,
    assessmentScores: input.assessmentScores,
    assessmentTier: input.assessmentTier,
    status: "new",
    leadSource: input.leadSource || "website",
    createdAt: now,
    updatedAt: now,
  };

  await putLead(lead);

  return lead;
}

/**
 * Enrich lead with analytics data from visitor session
 */
export async function enrichLeadWithAnalytics(
  visitorId: string,
  sessionId: string
): Promise<Partial<Lead>> {
  // Get sessions from the last 30 days to find the matching session
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  const sessions = await getSessionsForDateRange(startDateStr, endDateStr);

  // Find the matching session
  const session = sessions.find(
    (s: Session) => s.sessionId === sessionId && s.visitorId === visitorId
  );

  if (!session) {
    return {};
  }

  const enrichment: Partial<Lead> = {
    visitorId,
    sessionId,
    behaviorScore: session.leadScore,
    behaviorTier: session.leadTier as BehaviorTier | undefined,
    pagesVisited: session.pagesVisited,
    // Company identification from session
    identifiedCompany: session.companyName,
    identifiedDomain: session.companyDomain,
    identifiedIndustry: session.companyIndustry,
    // Attribution data
    referrerSource: session.referrerSource,
    referrerMedium: session.referrerMedium,
  };

  // Filter out undefined values
  return Object.fromEntries(
    Object.entries(enrichment).filter(([, v]) => v !== undefined)
  );
}

/**
 * Get a lead by its unique leadId
 */
export async function getLeadById(leadId: string): Promise<Lead | null> {
  return getLead(leadId);
}

/**
 * Update lead status and CRM fields
 */
export async function updateLeadStatus(
  leadId: string,
  updates: UpdateLeadInput
): Promise<void> {
  const lead = await getLead(leadId);

  if (!lead) {
    throw new Error(`Lead not found: ${leadId}`);
  }

  await updateLead(lead.email, lead.createdAt, updates);
}

/**
 * Add a note to a lead
 */
export async function addNoteToLead(
  leadId: string,
  content: string,
  author?: string
): Promise<LeadNote> {
  const lead = await getLead(leadId);

  if (!lead) {
    throw new Error(`Lead not found: ${leadId}`);
  }

  const note: LeadNote = {
    id: uuidv4(),
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  await addLeadNote(lead.email, lead.createdAt, note);

  return note;
}

/**
 * Record a contact attempt with a lead
 */
export async function recordContact(
  leadId: string,
  channel: ContactChannel,
  campaign?: string,
  notes?: string
): Promise<ContactRecord> {
  const lead = await getLead(leadId);

  if (!lead) {
    throw new Error(`Lead not found: ${leadId}`);
  }

  const record: ContactRecord = {
    id: uuidv4(),
    channel,
    contactedAt: new Date().toISOString(),
    campaign,
    notes,
  };

  await addContactRecord(lead.email, lead.createdAt, record);

  return record;
}

/**
 * Query leads with filters and pagination
 */
export async function getLeads(
  params: LeadQueryParams
): Promise<LeadQueryResult> {
  const {
    status,
    tier,
    industry,
    formType,
    startDate,
    endDate,
    minScore,
    search,
    limit = 50,
    lastKey,
    excludeContactedVia,
    contactedVia,
  } = params;

  // Check if we need post-filtering for contact history
  const needsContactFiltering = excludeContactedVia || contactedVia;

  // If querying only by status with no other filters, use the status index
  if (
    status &&
    !tier &&
    !industry &&
    !formType &&
    !search &&
    !minScore &&
    !startDate &&
    !endDate &&
    !needsContactFiltering
  ) {
    const result = await queryLeadsByStatus(status, limit, lastKey);
    return result;
  }

  // Use scanLeads for complex queries with filters
  const scanResult = await scanLeads({
    status,
    tier,
    industry,
    formType,
    startDate,
    endDate,
    minScore,
    search,
    limit: needsContactFiltering ? 500 : limit, // Fetch more if we need to filter
    lastKey,
    sortOrder: params.sortOrder,
  });

  // Apply contact history filtering if needed
  if (needsContactFiltering) {
    let filteredLeads = scanResult.leads;

    if (excludeContactedVia && excludeContactedVia.length > 0) {
      filteredLeads = filteredLeads.filter((lead) => {
        if (!lead.contactHistory || lead.contactHistory.length === 0) {
          return true; // Include leads with no contact history
        }
        // Exclude if they have been contacted via any of the excluded channels
        const contactedChannels = lead.contactHistory.map((c) => c.channel);
        return !excludeContactedVia.some((ch) => contactedChannels.includes(ch));
      });
    }

    if (contactedVia && contactedVia.length > 0) {
      filteredLeads = filteredLeads.filter((lead) => {
        if (!lead.contactHistory || lead.contactHistory.length === 0) {
          return false; // Exclude leads with no contact history
        }
        // Include only if they have been contacted via at least one of the channels
        const contactedChannels = lead.contactHistory.map((c) => c.channel);
        return contactedVia.some((ch) => contactedChannels.includes(ch));
      });
    }

    // Apply limit after filtering
    const limitedLeads = filteredLeads.slice(0, limit);

    return {
      leads: limitedLeads,
      totalCount: filteredLeads.length, // Return total matching leads, not just limited results
      lastKey: scanResult.lastKey,
    };
  }

  return scanResult;
}

/**
 * Get lead statistics for a date range
 */
export async function getLeadStats(
  startDate: string,
  endDate: string
): Promise<LeadStats> {
  // Scan all leads in the date range
  let allLeads: Lead[] = [];
  let lastKey: string | undefined;

  // Paginate through all results
  do {
    const result = await scanLeads({
      startDate,
      endDate: endDate + "T23:59:59.999Z",
      lastKey,
      limit: 100, // Fetch in batches
    });
    allLeads = allLeads.concat(result.leads);
    lastKey = result.lastKey;
  } while (lastKey);

  // Calculate statistics
  const byStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    opportunity: 0,
    customer: 0,
    lost: 0,
  };

  const byTier: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
    unassigned: 0,
  };

  const byIndustry: Record<string, number> = {};
  const byFormType: Record<LeadFormType, number> = {
    contact: 0,
    guide: 0,
    audit: 0,
    assessment: 0,
    chat: 0,
    newsletter: 0,
  };

  const byLeadSource: Record<LeadSource, number> = {
    website: 0,
    "csv-import": 0,
    linkedin: 0,
    referral: 0,
    event: 0,
    "cold-research": 0,
    other: 0,
  };

  const sourceCount: Record<string, number> = {};
  const leadsByDayMap: Record<string, number> = {};
  let totalBehaviorScore = 0;
  let behaviorScoreCount = 0;

  for (const lead of allLeads) {
    // Count by status
    byStatus[lead.status]++;

    // Count by tier
    if (lead.tier) {
      byTier[lead.tier] = (byTier[lead.tier] || 0) + 1;
    } else {
      byTier.unassigned++;
    }

    // Count by industry
    const industryVal = lead.industry || lead.identifiedIndustry || "Unknown";
    byIndustry[industryVal] = (byIndustry[industryVal] || 0) + 1;

    // Count by form type
    byFormType[lead.formType]++;

    // Count by lead source
    const leadSourceVal = lead.leadSource || "website";
    byLeadSource[leadSourceVal] = (byLeadSource[leadSourceVal] || 0) + 1;

    // Track sources
    const source =
      lead.utmSource ||
      lead.referrerSource ||
      lead.firstTouchSource ||
      "Direct";
    sourceCount[source] = (sourceCount[source] || 0) + 1;

    // Track by day
    const dayKey = lead.createdAt.split("T")[0];
    leadsByDayMap[dayKey] = (leadsByDayMap[dayKey] || 0) + 1;

    // Sum behavior scores
    if (lead.behaviorScore !== undefined) {
      totalBehaviorScore += lead.behaviorScore;
      behaviorScoreCount++;
    }
  }

  // Convert day map to sorted array
  const leadsByDay = Object.entries(leadsByDayMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Get top sources
  const topSources = Object.entries(sourceCount)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalLeads: allLeads.length,
    byStatus,
    byTier,
    byIndustry,
    byFormType,
    byLeadSource,
    avgBehaviorScore:
      behaviorScoreCount > 0 ? totalBehaviorScore / behaviorScoreCount : 0,
    leadsByDay,
    topSources,
  };
}

/**
 * Export leads with filtering (returns all matching leads for export)
 */
export async function exportLeads(params: {
  status?: LeadStatus;
  tier?: string;
  industry?: string;
  startDate?: string;
  endDate?: string;
  minScore?: number;
}): Promise<Lead[]> {
  let allLeads: Lead[] = [];
  let lastKey: string | undefined;

  // Paginate through all matching results
  do {
    const result = await scanLeads({
      status: params.status,
      tier: params.tier as "A" | "B" | "C" | undefined,
      industry: params.industry,
      startDate: params.startDate,
      endDate: params.endDate ? params.endDate + "T23:59:59.999Z" : undefined,
      minScore: params.minScore,
      lastKey,
      limit: 100,
    });
    allLeads = allLeads.concat(result.leads);
    lastKey = result.lastKey;
  } while (lastKey);

  return allLeads;
}
