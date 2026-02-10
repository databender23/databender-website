/**
 * Industry Template Types
 *
 * Templates contain all industry-specific content that stays constant
 * across prospects in that industry. Prospect data only contains
 * company-specific details.
 */

export interface IndustryTemplate {
  // Industry metadata
  industry: "legal" | "healthcare" | "dental" | "manufacturing" | "cre" | "accounting" | "construction" | "wholesale-distribution" | "general";
  industryDescriptor: string; // "mid-sized law firms", "healthcare organizations"

  // Current state section
  currentTools: {
    category: string;
    tools: string;
  }[];
  currentStateNote: string;

  // The Gap section
  gapHeadline: string;
  toolOptimizations: {
    tool: string;
    optimizesFor: string;
  }[];
  gapSummary: string;
  failedQueries: {
    query: string;
    whyFails: string;
  }[];
  gapConsequence: string;

  // Cost section
  inefficiencies: {
    issue: string;
    impact: string;
  }[];
  totalCostStatementTemplate: string; // Uses {companySize} placeholder

  // Solution section
  opportunityHeadline: string;
  opportunityIntro: string;
  benefits: string[];
  differentiators: {
    title: string;
    description: string;
  }[];

  // Comparison section
  comparison: {
    metric: string;
    traditional: string;
    newApproach: string;
  }[];
  mathConclusion: string;

  // Questions section
  questionsIntro: string;
  questions: string[];

  // CTA section
  ctaIntro: string;

  // Animation content
  searchQuery: string;
  dmsName: string;
  practiceAreas: string[];

  // Templates with placeholders ({companyName}, {companyShortName})
  introHookTemplate: string;
  keyInsightTemplate: string;
}

export interface ProspectInput {
  // Required
  slug: string;
  password: string;
  companyName: string;
  industry: "legal" | "healthcare" | "dental" | "manufacturing" | "cre" | "accounting" | "construction" | "wholesale-distribution" | "general";
  companySize: string;
  companyLocation: string;
  contactName: string;

  // Optional
  companyLogo?: string;
  contactTitle?: string;
  contactPhoto?: string;
  leadership?: string;
  recentNews?: string[];

  // Optional overrides for any template field
  overrides?: Partial<IndustryTemplate>;

  // Meta
  createdDate: string;
  softExpirationDays?: number;
}

export interface ProspectPage extends Omit<IndustryTemplate, 'introHookTemplate' | 'keyInsightTemplate' | 'totalCostStatementTemplate'> {
  // From ProspectInput
  slug: string;
  password: string;
  companyName: string;
  companyLogo?: string;
  companySize: string;
  companyLocation: string;
  leadership?: string;
  recentNews: string[];
  contactName: string;
  contactTitle?: string;
  contactPhoto?: string;
  createdDate: string;
  softExpirationDays: number;

  // Interpolated from templates
  introHook: string;
  keyInsight: string;
  totalCostStatement: string;
}
