/**
 * Email Template Test Script
 *
 * Tests all 15 email template functions to verify they generate correctly.
 * Run with: npx tsx test-templates.ts
 */

// Assessment templates
import { getDay0AssessmentTemplate } from "./src/lib/sequences/templates/assessment/day0";
import { getDay2AssessmentTemplate } from "./src/lib/sequences/templates/assessment/day2";
import { getDay7AssessmentTemplate } from "./src/lib/sequences/templates/assessment/day7";
import { getDay14AssessmentTemplate } from "./src/lib/sequences/templates/assessment/day14";
import { getDay21AssessmentTemplate } from "./src/lib/sequences/templates/assessment/day21";

// Guide-General templates
import { getDay0GuideGeneralTemplate } from "./src/lib/sequences/templates/guide-general/day0";
import { getDay2GuideGeneralTemplate } from "./src/lib/sequences/templates/guide-general/day2";
import { getDay7GuideGeneralTemplate } from "./src/lib/sequences/templates/guide-general/day7";
import { getDay14GuideGeneralTemplate } from "./src/lib/sequences/templates/guide-general/day14";
import { getDay21GuideGeneralTemplate } from "./src/lib/sequences/templates/guide-general/day21";

// Guide-Legal templates
import { getDay0GuideLegalTemplate } from "./src/lib/sequences/templates/guide-legal/day0";
import { getDay2GuideLegalTemplate } from "./src/lib/sequences/templates/guide-legal/day2";
import { getDay7GuideLegalTemplate } from "./src/lib/sequences/templates/guide-legal/day7";
import { getDay14GuideLegalTemplate } from "./src/lib/sequences/templates/guide-legal/day14";
import { getDay21GuideLegalTemplate } from "./src/lib/sequences/templates/guide-legal/day21";

// Sample test data
const assessmentParams = {
  firstName: "John",
  company: "Acme Corp",
  overallScore: 65,
  lowestCategory: "Data Quality",
  lowestCategoryScore: 45,
  highestCategory: "Analytics",
  primaryChallenge: "Manual data entry",
  assessmentName: "Data & AI Readiness Assessment",
  industry: "Manufacturing",
  calendarUrl: "https://calendly.com/test",
  unsubscribeUrl: "https://databender.co/api/unsubscribe?token=test",
};

const guideParams = {
  firstName: "Jane",
  company: "Law Firm LLP",
  guideTitle: "The Associate Multiplier",
  guideSlug: "associate-multiplier",
  downloadUrl: "/guides/associate-multiplier.pdf",
  contentUrl: "/resources/guides/associate-multiplier/content",
  calendarUrl: "https://calendly.com/test",
  unsubscribeUrl: "https://databender.co/api/unsubscribe?token=test",
};

interface TemplateResult {
  subject: string;
  htmlBody: string;
  textBody: string;
}

interface TestResult {
  name: string;
  passed: boolean;
  errors: string[];
}

/**
 * Validate a template result
 */
function validateTemplate(
  name: string,
  result: TemplateResult,
  firstName: string
): TestResult {
  const errors: string[] = [];

  // Check return structure
  if (typeof result !== "object" || result === null) {
    errors.push("Template did not return an object");
    return { name, passed: false, errors };
  }

  // Check subject
  if (typeof result.subject !== "string") {
    errors.push("subject is not a string");
  } else if (result.subject.trim().length === 0) {
    errors.push("subject is empty");
  }

  // Check htmlBody
  if (typeof result.htmlBody !== "string") {
    errors.push("htmlBody is not a string");
  } else {
    // Check for firstName in htmlBody
    if (!result.htmlBody.includes(firstName)) {
      errors.push(`htmlBody does not contain firstName "${firstName}"`);
    }
    // Check for unsubscribe link
    if (!result.htmlBody.toLowerCase().includes("unsubscribe")) {
      errors.push("htmlBody does not contain unsubscribe link");
    }
  }

  // Check textBody
  if (typeof result.textBody !== "string") {
    errors.push("textBody is not a string");
  } else if (result.textBody.trim().length === 0) {
    errors.push("textBody is empty");
  }

  return {
    name,
    passed: errors.length === 0,
    errors,
  };
}

/**
 * Run all template tests
 */
function runTests(): void {
  console.log("=".repeat(60));
  console.log("Email Template Test Suite");
  console.log("=".repeat(60));
  console.log("");

  const results: TestResult[] = [];

  // Test Assessment Templates
  console.log("Testing Assessment Templates...");
  console.log("-".repeat(40));

  try {
    const day0Assessment = getDay0AssessmentTemplate({
      firstName: assessmentParams.firstName,
      company: assessmentParams.company,
      overallScore: assessmentParams.overallScore,
      lowestCategory: assessmentParams.lowestCategory,
      highestCategory: assessmentParams.highestCategory,
      assessmentName: assessmentParams.assessmentName,
      calendarUrl: assessmentParams.calendarUrl,
      unsubscribeUrl: assessmentParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Assessment Day 0",
        day0Assessment,
        assessmentParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Assessment Day 0",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day2Assessment = getDay2AssessmentTemplate({
      firstName: assessmentParams.firstName,
      company: assessmentParams.company,
      lowestCategory: assessmentParams.lowestCategory,
      lowestCategoryScore: assessmentParams.lowestCategoryScore,
      assessmentName: assessmentParams.assessmentName,
      calendarUrl: assessmentParams.calendarUrl,
      unsubscribeUrl: assessmentParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Assessment Day 2",
        day2Assessment,
        assessmentParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Assessment Day 2",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day7Assessment = getDay7AssessmentTemplate({
      firstName: assessmentParams.firstName,
      company: assessmentParams.company,
      industry: assessmentParams.industry,
      calendarUrl: assessmentParams.calendarUrl,
      unsubscribeUrl: assessmentParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Assessment Day 7",
        day7Assessment,
        assessmentParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Assessment Day 7",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day14Assessment = getDay14AssessmentTemplate({
      firstName: assessmentParams.firstName,
      company: assessmentParams.company,
      industry: assessmentParams.industry,
      calendarUrl: assessmentParams.calendarUrl,
      unsubscribeUrl: assessmentParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Assessment Day 14",
        day14Assessment,
        assessmentParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Assessment Day 14",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day21Assessment = getDay21AssessmentTemplate({
      firstName: assessmentParams.firstName,
      company: assessmentParams.company,
      primaryChallenge: assessmentParams.primaryChallenge,
      assessmentName: assessmentParams.assessmentName,
      calendarUrl: assessmentParams.calendarUrl,
      unsubscribeUrl: assessmentParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Assessment Day 21",
        day21Assessment,
        assessmentParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Assessment Day 21",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  console.log("");
  console.log("Testing Guide-General Templates...");
  console.log("-".repeat(40));

  try {
    const day0GuideGeneral = getDay0GuideGeneralTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-General Day 0",
        day0GuideGeneral,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-General Day 0",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day2GuideGeneral = getDay2GuideGeneralTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-General Day 2",
        day2GuideGeneral,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-General Day 2",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day7GuideGeneral = getDay7GuideGeneralTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-General Day 7",
        day7GuideGeneral,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-General Day 7",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day14GuideGeneral = getDay14GuideGeneralTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-General Day 14",
        day14GuideGeneral,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-General Day 14",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day21GuideGeneral = getDay21GuideGeneralTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-General Day 21",
        day21GuideGeneral,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-General Day 21",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  console.log("");
  console.log("Testing Guide-Legal Templates...");
  console.log("-".repeat(40));

  try {
    const day0GuideLegal = getDay0GuideLegalTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-Legal Day 0",
        day0GuideLegal,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-Legal Day 0",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day2GuideLegal = getDay2GuideLegalTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-Legal Day 2",
        day2GuideLegal,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-Legal Day 2",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day7GuideLegal = getDay7GuideLegalTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-Legal Day 7",
        day7GuideLegal,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-Legal Day 7",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day14GuideLegal = getDay14GuideLegalTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-Legal Day 14",
        day14GuideLegal,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-Legal Day 14",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  try {
    const day21GuideLegal = getDay21GuideLegalTemplate({
      firstName: guideParams.firstName,
      company: guideParams.company,
      guideTitle: guideParams.guideTitle,
      guideSlug: guideParams.guideSlug,
      downloadUrl: guideParams.downloadUrl,
      contentUrl: guideParams.contentUrl,
      calendarUrl: guideParams.calendarUrl,
      unsubscribeUrl: guideParams.unsubscribeUrl,
    });
    results.push(
      validateTemplate(
        "Guide-Legal Day 21",
        day21GuideLegal,
        guideParams.firstName
      )
    );
  } catch (e) {
    results.push({
      name: "Guide-Legal Day 21",
      passed: false,
      errors: [`Exception: ${(e as Error).message}`],
    });
  }

  // Print results
  console.log("");
  console.log("=".repeat(60));
  console.log("Test Results");
  console.log("=".repeat(60));
  console.log("");

  let passCount = 0;
  let failCount = 0;

  for (const result of results) {
    if (result.passed) {
      passCount++;
      console.log(`[PASS] ${result.name}`);
    } else {
      failCount++;
      console.log(`[FAIL] ${result.name}`);
      for (const error of result.errors) {
        console.log(`       - ${error}`);
      }
    }
  }

  console.log("");
  console.log("=".repeat(60));
  console.log(`Summary: ${passCount} passed, ${failCount} failed out of ${results.length} templates`);
  console.log("=".repeat(60));

  // Exit with appropriate code
  process.exit(failCount > 0 ? 1 : 0);
}

// Run the tests
runTests();
