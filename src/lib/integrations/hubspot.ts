/**
 * HubSpot CRM Integration
 *
 * Integrates with HubSpot Free CRM for contact management, deal tracking,
 * and closed-loop attribution.
 *
 * Features:
 * - Contact create/update with custom properties
 * - Lead scoring sync
 * - Deal creation for hot leads
 * - Activity logging
 * - Closed-loop attribution tracking
 *
 * Rate Limiting:
 * - HubSpot Free tier: 100 requests per 10 seconds
 * - This module implements request queuing to respect limits
 *
 * Required HubSpot Custom Properties (create in HubSpot settings):
 * - lead_score (number) - Behavioral lead score from website
 * - lead_tier (dropdown: Cold, Warm, Hot, Very Hot) - Lead classification
 * - first_touch_source (text) - Original traffic source
 * - first_touch_page (text) - First landing page URL
 * - pages_visited (text) - Comma-separated list of pages viewed
 * - page_journey (text) - JSON string of page journey with timestamps
 * - identified_company (text) - Company identified via IP lookup
 * - assessment_score (number) - Score from website assessments
 * - assessment_tier (text) - Assessment result tier
 *
 * Environment Variables:
 * - HUBSPOT_API_KEY - Private app access token
 */

// Types
export interface HubSpotContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  // Custom properties
  lead_score?: number;
  lead_tier?: string;
  first_touch_source?: string;
  first_touch_page?: string;
  pages_visited?: string;
  page_journey?: string;
  identified_company?: string;
  assessment_score?: number;
  assessment_tier?: string;
}

export interface HubSpotDealData {
  contactEmail: string;
  dealName: string;
  amount?: number;
  stage: string;
  source?: string;
}

export interface HubSpotActivityData {
  email: string;
  type: "note" | "email" | "call";
  content: string;
}

export interface DealAttribution {
  firstTouchSource: string;
  firstTouchPage: string;
  pageJourney: string[];
}

interface HubSpotContact {
  id: string;
  properties: Record<string, string | null>;
}

interface HubSpotDeal {
  id: string;
  properties: Record<string, string | null>;
}

interface HubSpotError {
  status: string;
  message: string;
  correlationId?: string;
  category?: string;
}

// Configuration
const HUBSPOT_API_BASE = "https://api.hubapi.com";
const RATE_LIMIT_REQUESTS = 100;
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Rate limiting state
let requestQueue: Array<() => Promise<void>> = [];
let requestTimestamps: number[] = [];
let isProcessingQueue = false;

// Contact lookup cache
const contactCache = new Map<
  string,
  { contact: HubSpotContact | null; timestamp: number }
>();

/**
 * Get HubSpot API key from environment
 */
function getApiKey(): string | null {
  return process.env.HUBSPOT_API_KEY || null;
}

/**
 * Check if HubSpot integration is configured
 */
export function isHubSpotConfigured(): boolean {
  return !!getApiKey();
}

/**
 * Rate limiter - ensures we don't exceed HubSpot's rate limits
 */
async function waitForRateLimit(): Promise<void> {
  const now = Date.now();

  // Remove timestamps older than the rate limit window
  requestTimestamps = requestTimestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  // If we're at the limit, wait until the oldest request expires
  if (requestTimestamps.length >= RATE_LIMIT_REQUESTS) {
    const oldestTimestamp = requestTimestamps[0];
    const waitTime = RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp) + 100; // 100ms buffer
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return waitForRateLimit(); // Recurse to check again
  }

  // Record this request timestamp
  requestTimestamps.push(now);
}

/**
 * Process queued requests
 */
async function processQueue(): Promise<void> {
  if (isProcessingQueue || requestQueue.length === 0) {
    return;
  }

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await waitForRateLimit();
      try {
        await request();
      } catch (error) {
        console.error("[HubSpot] Queue request failed:", error);
      }
    }
  }

  isProcessingQueue = false;
}

/**
 * Queue a request for execution
 */
function queueRequest(request: () => Promise<void>): void {
  requestQueue.push(request);
  processQueue();
}

/**
 * Make an API request to HubSpot with retries
 */
async function hubspotRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("HubSpot API key not configured");
  }

  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await waitForRateLimit();

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle rate limiting (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 10000;
        console.warn(
          `[HubSpot] Rate limited, waiting ${waitTime}ms before retry`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // Handle other errors
      if (!response.ok) {
        const errorBody = (await response.json()) as HubSpotError;
        throw new Error(
          `HubSpot API error: ${errorBody.message || response.statusText}`
        );
      }

      // Return empty object for 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt);
        console.warn(
          `[HubSpot] Request failed, retrying in ${delay}ms:`,
          lastError.message
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("HubSpot request failed after retries");
}

/**
 * Get cached contact or fetch from HubSpot
 */
async function getCachedContact(
  email: string
): Promise<HubSpotContact | null> {
  const cached = contactCache.get(email);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.contact;
  }

  try {
    const response = await hubspotRequest<HubSpotContact>(
      `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=email,firstname,lastname,company,phone,lead_score,lead_tier,first_touch_source,first_touch_page,pages_visited,page_journey,identified_company,assessment_score,assessment_tier`
    );

    contactCache.set(email, { contact: response, timestamp: now });
    return response;
  } catch (error) {
    // Contact not found is not an error - cache null result
    if (
      error instanceof Error &&
      error.message.includes("404")
    ) {
      contactCache.set(email, { contact: null, timestamp: now });
      return null;
    }
    throw error;
  }
}

/**
 * Invalidate contact cache
 */
function invalidateContactCache(email: string): void {
  contactCache.delete(email);
}

/**
 * Map our property names to HubSpot property names
 */
function mapToHubSpotProperties(
  data: HubSpotContactData
): Record<string, string | number> {
  const properties: Record<string, string | number> = {};

  if (data.email) properties.email = data.email;
  if (data.firstName) properties.firstname = data.firstName;
  if (data.lastName) properties.lastname = data.lastName;
  if (data.company) properties.company = data.company;
  if (data.phone) properties.phone = data.phone;

  // Custom properties (already in HubSpot naming convention)
  if (data.lead_score !== undefined)
    properties.lead_score = data.lead_score;
  if (data.lead_tier) properties.lead_tier = data.lead_tier;
  if (data.first_touch_source)
    properties.first_touch_source = data.first_touch_source;
  if (data.first_touch_page)
    properties.first_touch_page = data.first_touch_page;
  if (data.pages_visited) properties.pages_visited = data.pages_visited;
  if (data.page_journey) properties.page_journey = data.page_journey;
  if (data.identified_company)
    properties.identified_company = data.identified_company;
  if (data.assessment_score !== undefined)
    properties.assessment_score = data.assessment_score;
  if (data.assessment_tier) properties.assessment_tier = data.assessment_tier;

  return properties;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Create or update a contact in HubSpot
 *
 * Uses HubSpot's batch upsert endpoint to create if not exists, or update if exists.
 */
export async function createOrUpdateContact(
  data: HubSpotContactData
): Promise<HubSpotContact> {
  if (!isHubSpotConfigured()) {
    throw new Error("HubSpot is not configured");
  }

  const properties = mapToHubSpotProperties(data);

  // Use the batch upsert endpoint for create-or-update functionality
  const response = await hubspotRequest<{
    results: HubSpotContact[];
  }>("/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    body: JSON.stringify({
      inputs: [
        {
          idProperty: "email",
          id: data.email,
          properties,
        },
      ],
    }),
  });

  // Invalidate cache since we updated the contact
  invalidateContactCache(data.email);

  return response.results[0];
}

/**
 * Update lead score and tier for a contact
 */
export async function updateLeadScore(
  email: string,
  score: number,
  tier: string
): Promise<void> {
  if (!isHubSpotConfigured()) {
    console.log("[HubSpot] Not configured, skipping lead score update");
    return;
  }

  await createOrUpdateContact({
    email,
    lead_score: score,
    lead_tier: tier,
  });
}

/**
 * Add a contact to a HubSpot list
 */
export async function addToList(
  email: string,
  listId: string
): Promise<void> {
  if (!isHubSpotConfigured()) {
    console.log("[HubSpot] Not configured, skipping add to list");
    return;
  }

  // First get the contact ID
  const contact = await getCachedContact(email);

  if (!contact) {
    console.warn(`[HubSpot] Contact not found for email: ${email}`);
    return;
  }

  await hubspotRequest(`/contacts/v1/lists/${listId}/add`, {
    method: "POST",
    body: JSON.stringify({
      vids: [parseInt(contact.id, 10)],
    }),
  });
}

/**
 * Create a deal in HubSpot (for hot leads)
 */
export async function createDeal(data: HubSpotDealData): Promise<HubSpotDeal> {
  if (!isHubSpotConfigured()) {
    throw new Error("HubSpot is not configured");
  }

  // First get or create the contact
  const contact = await getCachedContact(data.contactEmail);

  if (!contact) {
    // Create the contact first
    await createOrUpdateContact({ email: data.contactEmail });
  }

  const contactId = contact?.id;

  // Create the deal
  const dealProperties: Record<string, string | number> = {
    dealname: data.dealName,
    dealstage: data.stage,
  };

  if (data.amount !== undefined) {
    dealProperties.amount = data.amount;
  }

  if (data.source) {
    dealProperties.hs_analytics_source = data.source;
  }

  const deal = await hubspotRequest<HubSpotDeal>("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({
      properties: dealProperties,
    }),
  });

  // Associate the deal with the contact
  if (contactId) {
    await hubspotRequest(
      `/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/deal_to_contact`,
      {
        method: "PUT",
      }
    );
  }

  return deal;
}

/**
 * Log an activity (note, email, or call) for a contact
 */
export async function logActivity(
  email: string,
  type: "note" | "email" | "call",
  content: string
): Promise<void> {
  if (!isHubSpotConfigured()) {
    console.log("[HubSpot] Not configured, skipping activity log");
    return;
  }

  const contact = await getCachedContact(email);

  if (!contact) {
    console.warn(`[HubSpot] Contact not found for activity log: ${email}`);
    return;
  }

  const objectType =
    type === "note" ? "notes" : type === "email" ? "emails" : "calls";

  const properties: Record<string, string> = {};

  if (type === "note") {
    properties.hs_note_body = content;
    properties.hs_timestamp = new Date().toISOString();
  } else if (type === "email") {
    properties.hs_email_direction = "OUTBOUND";
    properties.hs_email_status = "SENT";
    properties.hs_email_subject = content.substring(0, 100);
    properties.hs_email_text = content;
    properties.hs_timestamp = new Date().toISOString();
  } else {
    // call
    properties.hs_call_body = content;
    properties.hs_call_status = "COMPLETED";
    properties.hs_timestamp = new Date().toISOString();
  }

  const engagement = await hubspotRequest<{ id: string }>(
    `/crm/v3/objects/${objectType}`,
    {
      method: "POST",
      body: JSON.stringify({ properties }),
    }
  );

  // Associate with contact
  await hubspotRequest(
    `/crm/v3/objects/${objectType}/${engagement.id}/associations/contacts/${contact.id}/${objectType.slice(0, -1)}_to_contact`,
    {
      method: "PUT",
    }
  );
}

/**
 * Get attribution data for a closed deal
 * Used for closed-loop reporting to see which marketing channels drive revenue
 */
export async function getDealAttribution(
  dealId: string
): Promise<DealAttribution | null> {
  if (!isHubSpotConfigured()) {
    return null;
  }

  try {
    // Get the deal and its associated contacts
    const deal = await hubspotRequest<{
      id: string;
      properties: Record<string, string | null>;
    }>(
      `/crm/v3/objects/deals/${dealId}?properties=dealname,amount,dealstage`
    );

    // Get associated contacts
    const associations = await hubspotRequest<{
      results: Array<{ id: string; type: string }>;
    }>(`/crm/v3/objects/deals/${dealId}/associations/contacts`);

    if (!associations.results || associations.results.length === 0) {
      return null;
    }

    // Get the first associated contact's attribution data
    const contactId = associations.results[0].id;
    const contact = await hubspotRequest<HubSpotContact>(
      `/crm/v3/objects/contacts/${contactId}?properties=first_touch_source,first_touch_page,page_journey`
    );

    // Parse page journey if it exists
    let pageJourney: string[] = [];
    if (contact.properties.page_journey) {
      try {
        const journeyData = JSON.parse(contact.properties.page_journey);
        pageJourney = Array.isArray(journeyData)
          ? journeyData.map((j: { page?: string }) => j.page || "")
          : [];
      } catch {
        // If JSON parse fails, treat as comma-separated
        pageJourney = contact.properties.page_journey.split(",");
      }
    }

    return {
      firstTouchSource: contact.properties.first_touch_source || "Direct",
      firstTouchPage: contact.properties.first_touch_page || "/",
      pageJourney,
    };
  } catch (error) {
    console.error("[HubSpot] Failed to get deal attribution:", error);
    return null;
  }
}

// ============================================================================
// Fire-and-forget helpers for non-blocking operations
// ============================================================================

/**
 * Sync a lead to HubSpot in the background (fire and forget)
 * Use this in API routes to not block the response
 */
export function syncLeadToHubSpotAsync(data: HubSpotContactData): void {
  if (!isHubSpotConfigured()) {
    return;
  }

  queueRequest(async () => {
    try {
      await createOrUpdateContact(data);
      console.log(`[HubSpot] Contact synced: ${data.email}`);
    } catch (error) {
      console.error(`[HubSpot] Failed to sync contact ${data.email}:`, error);
    }
  });
}

/**
 * Update lead score in the background (fire and forget)
 */
export function updateLeadScoreAsync(
  email: string,
  score: number,
  tier: string
): void {
  if (!isHubSpotConfigured()) {
    return;
  }

  queueRequest(async () => {
    try {
      await updateLeadScore(email, score, tier);
      console.log(`[HubSpot] Lead score updated: ${email} (${score} - ${tier})`);
    } catch (error) {
      console.error(`[HubSpot] Failed to update lead score for ${email}:`, error);
    }
  });
}

/**
 * Log activity in the background (fire and forget)
 */
export function logActivityAsync(
  email: string,
  type: "note" | "email" | "call",
  content: string
): void {
  if (!isHubSpotConfigured()) {
    return;
  }

  queueRequest(async () => {
    try {
      await logActivity(email, type, content);
      console.log(`[HubSpot] Activity logged for ${email}: ${type}`);
    } catch (error) {
      console.error(`[HubSpot] Failed to log activity for ${email}:`, error);
    }
  });
}

// ============================================================================
// Utility functions
// ============================================================================

/**
 * Format pages visited array as comma-separated string for HubSpot
 */
export function formatPagesVisited(pages: string[] | undefined): string {
  if (!pages || pages.length === 0) return "";
  // Remove duplicates and join
  return Array.from(new Set(pages)).join(", ");
}

/**
 * Format page journey array as JSON string for HubSpot
 */
export function formatPageJourney(
  journey:
    | Array<{ page: string; timestamp?: string; duration?: number }>
    | undefined
): string {
  if (!journey || journey.length === 0) return "";
  return JSON.stringify(journey);
}

/**
 * Get current queue length (for monitoring)
 */
export function getQueueLength(): number {
  return requestQueue.length;
}

/**
 * Clear the request queue (for testing)
 */
export function clearQueue(): void {
  requestQueue = [];
}
