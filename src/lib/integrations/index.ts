/**
 * Integrations Module
 *
 * Central export for all third-party CRM and marketing integrations.
 * Currently supports:
 * - HubSpot Free CRM
 *
 * Future integrations can be added here (e.g., Salesforce, Pipedrive, etc.)
 */

// HubSpot CRM Integration
export {
  // Configuration check
  isHubSpotConfigured,
  // Contact management
  createOrUpdateContact,
  updateLeadScore,
  addToList,
  // Deal management
  createDeal,
  // Activity logging
  logActivity,
  // Attribution
  getDealAttribution,
  // Async (fire-and-forget) helpers
  syncLeadToHubSpotAsync,
  updateLeadScoreAsync,
  logActivityAsync,
  // Utility functions
  formatPagesVisited,
  formatPageJourney,
  getQueueLength,
  clearQueue,
  // Types
  type HubSpotContactData,
  type HubSpotDealData,
  type HubSpotActivityData,
  type DealAttribution,
} from "./hubspot";
