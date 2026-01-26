/**
 * Industry Templates Index
 *
 * Export all templates and provide the merge function
 * that combines template + prospect data.
 */

import type { IndustryTemplate, ProspectInput, ProspectPage } from "./types";
import { legalTemplate } from "./legal";
import { healthcareTemplate } from "./healthcare";
import { manufacturingTemplate } from "./manufacturing";
import { creTemplate } from "./cre";

export * from "./types";

export const industryTemplates: Record<string, IndustryTemplate> = {
  legal: legalTemplate,
  healthcare: healthcareTemplate,
  manufacturing: manufacturingTemplate,
  cre: creTemplate,
  // general uses legal as fallback for now
  general: legalTemplate,
};

/**
 * Interpolate template strings with prospect data
 */
function interpolate(template: string, data: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] || `{${key}}`);
}

/**
 * Get short company name (first word or before comma)
 */
function getShortName(companyName: string): string {
  // Handle "Levenfeld Pearlstein LLC" -> "Levenfeld"
  // Handle "Smith, Jones & Associates" -> "Smith"
  const beforeComma = companyName.split(",")[0];
  const firstWord = beforeComma.split(" ")[0];
  return firstWord;
}

/**
 * Merge industry template with prospect data to create full ProspectPage
 */
export function buildProspectPage(prospect: ProspectInput): ProspectPage {
  const template = industryTemplates[prospect.industry] || industryTemplates.legal;

  // Apply any prospect-specific overrides
  const mergedTemplate = prospect.overrides
    ? { ...template, ...prospect.overrides }
    : template;

  // Interpolation data
  const interpolationData = {
    companyName: prospect.companyName,
    companyShortName: getShortName(prospect.companyName),
    companySize: prospect.companySize,
  };

  return {
    // From template
    industry: mergedTemplate.industry,
    industryDescriptor: mergedTemplate.industryDescriptor,
    currentTools: mergedTemplate.currentTools,
    currentStateNote: mergedTemplate.currentStateNote,
    gapHeadline: mergedTemplate.gapHeadline,
    toolOptimizations: mergedTemplate.toolOptimizations,
    gapSummary: mergedTemplate.gapSummary,
    failedQueries: mergedTemplate.failedQueries,
    gapConsequence: mergedTemplate.gapConsequence,
    inefficiencies: mergedTemplate.inefficiencies,
    opportunityHeadline: mergedTemplate.opportunityHeadline,
    opportunityIntro: mergedTemplate.opportunityIntro,
    benefits: mergedTemplate.benefits,
    differentiators: mergedTemplate.differentiators,
    comparison: mergedTemplate.comparison,
    mathConclusion: mergedTemplate.mathConclusion,
    questionsIntro: mergedTemplate.questionsIntro,
    questions: mergedTemplate.questions,
    ctaIntro: mergedTemplate.ctaIntro,
    searchQuery: mergedTemplate.searchQuery,
    dmsName: mergedTemplate.dmsName,
    practiceAreas: mergedTemplate.practiceAreas,

    // Interpolated templates
    introHook: interpolate(mergedTemplate.introHookTemplate, interpolationData),
    keyInsight: interpolate(mergedTemplate.keyInsightTemplate, interpolationData),
    totalCostStatement: interpolate(mergedTemplate.totalCostStatementTemplate, interpolationData),

    // From prospect
    slug: prospect.slug,
    password: prospect.password,
    companyName: prospect.companyName,
    companyLogo: prospect.companyLogo,
    companySize: prospect.companySize,
    companyLocation: prospect.companyLocation,
    leadership: prospect.leadership,
    recentNews: prospect.recentNews || [],
    contactName: prospect.contactName,
    contactTitle: prospect.contactTitle,
    contactPhoto: prospect.contactPhoto,
    createdDate: prospect.createdDate,
    softExpirationDays: prospect.softExpirationDays || 30,
  };
}
