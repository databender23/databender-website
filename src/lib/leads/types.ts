import type { PageJourneyStep, UTMParams } from "../analytics/events";
import type { EmailSequence } from "../sequences/types";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "opportunity"
  | "customer"
  | "lost";

export type LeadTier = "A" | "B" | "C";

export type LeadFormType =
  | "contact"
  | "guide"
  | "audit"
  | "assessment"
  | "chat"
  | "newsletter";

export type BehaviorTier = "Cold" | "Warm" | "Hot" | "Very Hot";

export interface LeadNote {
  id: string;
  content: string;
  author?: string;
  createdAt: string;
}

export type ContactChannel = "linkedin" | "email" | "phone" | "other";

export interface ContactRecord {
  id: string;
  channel: ContactChannel;
  contactedAt: string;
  campaign?: string;  // e.g., "Q1-Legal-Outreach"
  notes?: string;
}

export interface Lead {
  // Primary keys
  pk: string; // LEAD#{email}
  sk: string; // #CREATED#{timestamp}
  leadId: string;

  // Contact info
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  message?: string;

  // Form context
  formType: LeadFormType;
  resourceSlug?: string;
  resourceTitle?: string;
  sourcePage: string;

  // Analytics linkage
  visitorId?: string;
  sessionId?: string;
  behaviorScore?: number;
  behaviorTier?: BehaviorTier;
  pagesVisited?: string[];
  pageJourney?: PageJourneyStep[];

  // Company identification (from IP lookup)
  identifiedCompany?: string;
  identifiedDomain?: string;
  identifiedIndustry?: string;

  // Attribution
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrerSource?: string;
  referrerMedium?: string;
  firstTouchSource?: string;
  firstTouchLandingPage?: string;
  firstVisitDate?: string;

  // CRM status fields
  status: LeadStatus;
  tier?: LeadTier;
  industry?: string;
  notes?: LeadNote[];
  tags?: string[];
  contactHistory?: ContactRecord[];
  assignedTo?: string;

  // Assessment-specific data
  assessmentScores?: Record<string, number>;
  assessmentTier?: string;

  // Email sequence tracking
  emailSequence?: EmailSequence;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastActivityAt?: string;
}

export interface CreateLeadInput {
  // Required contact info
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;

  // Form context
  formType: LeadFormType;
  resourceSlug?: string;
  resourceTitle?: string;
  sourcePage: string;

  // Analytics linkage (passed from client)
  visitorId?: string;
  sessionId?: string;
  behaviorScore?: number;
  behaviorTier?: BehaviorTier;
  pagesVisited?: string[];
  pageJourney?: PageJourneyStep[];

  // Company identification
  identifiedCompany?: string;
  identifiedDomain?: string;
  identifiedIndustry?: string;

  // Attribution
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrerSource?: string;
  referrerMedium?: string;
  firstTouchSource?: string;
  firstTouchLandingPage?: string;
  firstVisitDate?: string;

  // Assessment-specific
  assessmentScores?: Record<string, number>;
  assessmentTier?: string;

  // Email sequence (optional - usually set by enrollInSequence)
  emailSequence?: EmailSequence;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  tier?: LeadTier;
  industry?: string;
  tags?: string[];
  assignedTo?: string;
  emailSequence?: EmailSequence;
  contactHistory?: ContactRecord[];
}

export interface LeadQueryParams {
  status?: LeadStatus;
  tier?: LeadTier;
  industry?: string;
  formType?: LeadFormType;
  startDate?: string;
  endDate?: string;
  minScore?: number;
  search?: string;
  limit?: number;
  lastKey?: string;
  sortBy?: "createdAt" | "behaviorScore" | "lastActivityAt";
  sortOrder?: "asc" | "desc";
  excludeContactedVia?: ContactChannel[];  // Exclude leads contacted via these channels
  contactedVia?: ContactChannel[];  // Only leads contacted via these channels
}

export interface LeadQueryResult {
  leads: Lead[];
  totalCount: number;
  lastKey?: string;
}

export interface LeadStats {
  totalLeads: number;
  byStatus: Record<LeadStatus, number>;
  byTier: Record<string, number>;
  byIndustry: Record<string, number>;
  byFormType: Record<LeadFormType, number>;
  avgBehaviorScore: number;
  leadsByDay: { date: string; count: number }[];
  topSources: { source: string; count: number }[];
}

export interface LeadExportParams {
  format: "csv" | "json";
  status?: LeadStatus;
  tier?: LeadTier;
  industry?: string;
  startDate?: string;
  endDate?: string;
  minScore?: number;
  fields?: string[];
  excludeContactedVia?: ContactChannel[];
  contactedVia?: ContactChannel[];
}
