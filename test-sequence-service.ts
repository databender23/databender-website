/**
 * Test Script for Sequence Service Utility Functions
 *
 * Run with: npx tsx test-sequence-service.ts
 * (Note: tsx is preferred over ts-node for ESM projects)
 */

import {
  generateUnsubscribeToken,
  decodeUnsubscribeToken,
  getAssessmentDetails,
  getNextEmailDay,
} from "./src/lib/sequences/sequence-service";

import { getGuideSequenceType } from "./src/lib/sequences/types";

import type { Lead } from "./src/lib/leads/types";
import type { EmailSequence } from "./src/lib/sequences/types";

// Test tracking
let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`\x1b[32m PASS \x1b[0m ${name}`);
    passed++;
  } catch (error) {
    console.log(`\x1b[31m FAIL \x1b[0m ${name}`);
    console.log(`       Error: ${(error as Error).message}`);
    failed++;
  }
}

function assertEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    throw new Error(
      message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

function assertNotNull<T>(value: T | null, message?: string): asserts value is T {
  if (value === null) {
    throw new Error(message || "Expected value to not be null");
  }
}

// Helper to create a mock lead with email sequence
function createMockLead(
  enrolledDaysAgo: number,
  sentDays: number[],
  status: "active" | "completed" | "paused" | "unsubscribed" = "active"
): Lead {
  const enrolledAt = new Date();
  enrolledAt.setDate(enrolledAt.getDate() - enrolledDaysAgo);

  const emailsSent: EmailSequence["emailsSent"] = {};
  for (const day of sentDays) {
    const key = `day${day}` as keyof EmailSequence["emailsSent"];
    emailsSent[key] = { sentAt: new Date().toISOString() };
  }

  return {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01T00:00:00.000Z",
    leadId: "test-lead-id",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "assessment",
    sourcePage: "/test",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emailSequence: {
      sequenceType: "assessment",
      enrolledAt: enrolledAt.toISOString(),
      status,
      currentDay: Math.max(0, ...sentDays),
      emailsSent,
    },
  };
}

console.log("\n========================================");
console.log("  Sequence Service Utility Tests");
console.log("========================================\n");

// ===========================================
// Test 1: generateUnsubscribeToken / decodeUnsubscribeToken
// ===========================================
console.log("\n--- Test: Unsubscribe Token Functions ---\n");

test("generateUnsubscribeToken creates a base64url token", () => {
  const token = generateUnsubscribeToken("test@example.com");
  // Token should be a non-empty string
  assertEqual(typeof token, "string");
  assertEqual(token.length > 0, true, "Token should not be empty");
  // Token should be base64url (no + / =)
  assertEqual(/^[A-Za-z0-9_-]+$/.test(token), true, "Token should be base64url encoded");
});

test("decodeUnsubscribeToken decodes token correctly", () => {
  const originalEmail = "test@example.com";
  const token = generateUnsubscribeToken(originalEmail);
  const decoded = decodeUnsubscribeToken(token);

  assertNotNull(decoded, "Decoded token should not be null");
  assertEqual(decoded.email, originalEmail.toLowerCase(), "Email should match");
  assertEqual(typeof decoded.ts, "number", "Timestamp should be a number");
});

test("decodeUnsubscribeToken returns null for invalid token", () => {
  const result = decodeUnsubscribeToken("invalid-token");
  assertEqual(result, null, "Should return null for invalid token");
});

test("Token roundtrip preserves email (case insensitive)", () => {
  const testEmail = "Test@Example.COM";
  const token = generateUnsubscribeToken(testEmail);
  const decoded = decodeUnsubscribeToken(token);

  assertNotNull(decoded);
  assertEqual(decoded.email, "test@example.com", "Email should be lowercased");
});

// ===========================================
// Test 2: getAssessmentDetails
// ===========================================
console.log("\n--- Test: getAssessmentDetails ---\n");

test("getAssessmentDetails calculates correct overallScore", () => {
  const lead: Lead = {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01",
    leadId: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "assessment",
    sourcePage: "/test",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assessmentScores: {
      dataInfrastructure: 80,
      analyticsCapability: 45,
      automationMaturity: 60,
    },
  };

  const details = getAssessmentDetails(lead);

  // Average of 80 + 45 + 60 = 185 / 3 = 61.67 -> 62 (rounded)
  assertEqual(details.overallScore, 62, "Overall score should be 62 (rounded average)");
});

test("getAssessmentDetails finds lowestCategory correctly", () => {
  const lead: Lead = {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01",
    leadId: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "assessment",
    sourcePage: "/test",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assessmentScores: {
      dataInfrastructure: 80,
      analyticsCapability: 45,
      automationMaturity: 60,
    },
  };

  const details = getAssessmentDetails(lead);

  // analyticsCapability (45) is lowest, should be formatted as "Analytics Capability"
  assertEqual(
    details.lowestCategory,
    "Analytics Capability",
    "Lowest category should be 'Analytics Capability'"
  );
  assertEqual(details.lowestCategoryScore, 45, "Lowest score should be 45");
});

test("getAssessmentDetails finds highestCategory correctly", () => {
  const lead: Lead = {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01",
    leadId: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "assessment",
    sourcePage: "/test",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assessmentScores: {
      dataInfrastructure: 80,
      analyticsCapability: 45,
      automationMaturity: 60,
    },
  };

  const details = getAssessmentDetails(lead);

  // dataInfrastructure (80) is highest, should be formatted as "Data Infrastructure"
  assertEqual(
    details.highestCategory,
    "Data Infrastructure",
    "Highest category should be 'Data Infrastructure'"
  );
});

test("getAssessmentDetails handles empty scores", () => {
  const lead: Lead = {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01",
    leadId: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "assessment",
    sourcePage: "/test",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assessmentScores: {},
  };

  const details = getAssessmentDetails(lead);

  assertEqual(details.overallScore, 0, "Overall score should be 0 for empty scores");
  assertEqual(details.lowestCategory, "General", "Lowest category should default to 'General'");
  assertEqual(details.highestCategory, "General", "Highest category should default to 'General'");
});

// ===========================================
// Test 3: getNextEmailDay
// ===========================================
console.log("\n--- Test: getNextEmailDay ---\n");

test("Lead enrolled today with no emails sent should return 0", () => {
  const lead = createMockLead(0, []); // enrolled today, no emails sent
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, 0, "Should return day 0 for new lead");
});

test("Lead enrolled 3 days ago with day0 sent should return 2", () => {
  const lead = createMockLead(3, [0]); // enrolled 3 days ago, day0 sent
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, 2, "Should return day 2 (3 days >= 2, day2 not sent)");
});

test("Lead enrolled 8 days ago with day0,2 sent should return 7", () => {
  const lead = createMockLead(8, [0, 2]); // enrolled 8 days ago, day0 and day2 sent
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, 7, "Should return day 7 (8 days >= 7, day7 not sent)");
});

test("Lead enrolled 22 days ago with all emails sent should return null", () => {
  const lead = createMockLead(22, [0, 2, 7, 14, 21]); // all emails sent
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, null, "Should return null when all emails sent");
});

test("Lead with no email sequence should return null", () => {
  const lead: Lead = {
    pk: "LEAD#test@example.com",
    sk: "#CREATED#2024-01-01",
    leadId: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    formType: "contact",
    sourcePage: "/contact",
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // No emailSequence
  };

  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, null, "Should return null for lead without email sequence");
});

test("Lead with paused sequence should return null", () => {
  const lead = createMockLead(5, [0], "paused");
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, null, "Should return null for paused sequence");
});

test("Lead with unsubscribed status should return null", () => {
  const lead = createMockLead(5, [0], "unsubscribed");
  const nextDay = getNextEmailDay(lead);
  assertEqual(nextDay, null, "Should return null for unsubscribed lead");
});

// ===========================================
// Test 4: getGuideSequenceType
// ===========================================
console.log("\n--- Test: getGuideSequenceType ---\n");

test("legal-ai-readiness should return guide-legal", () => {
  const result = getGuideSequenceType("legal-ai-readiness");
  assertEqual(result, "guide-legal", "Should return 'guide-legal' for legal-ai-readiness");
});

test("ai-in-legal should return guide-legal", () => {
  const result = getGuideSequenceType("ai-in-legal");
  assertEqual(result, "guide-legal", "Should return 'guide-legal' for ai-in-legal");
});

test("random-guide should return guide-general", () => {
  const result = getGuideSequenceType("random-guide");
  assertEqual(result, "guide-general", "Should return 'guide-general' for unknown guides");
});

test("unknown guide should return guide-general", () => {
  const result = getGuideSequenceType("some-other-guide-slug");
  assertEqual(result, "guide-general", "Should return 'guide-general' as default");
});

// ===========================================
// Summary
// ===========================================
console.log("\n========================================");
console.log("  Test Results");
console.log("========================================");
console.log(`\x1b[32m  Passed: ${passed}\x1b[0m`);
console.log(`\x1b[31m  Failed: ${failed}\x1b[0m`);
console.log(`  Total:  ${passed + failed}`);
console.log("========================================\n");

process.exit(failed > 0 ? 1 : 0);
