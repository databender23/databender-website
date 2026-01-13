// Lead Magnets Data - Audits, Guides, and Assessments

export interface Audit {
  slug: string;
  title: string;
  description: string;
  deliverable: string;
  targetAudience: string;
  icon: string;
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  targetAudience: string;
  icon: string;
}

export interface Assessment {
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  timeEstimate: string;
  targetAudience: string;
  icon: string;
  externalUrl?: string; // For Typeform/Outgrow integrations
}

// Legal - Audit-Based Outreach (Not Self-Service)
export const legalAudits: Audit[] = [
  {
    slug: "ai-agent-opportunity",
    title: "AI Agent Opportunity Audit",
    description: "Identify workflows where autonomous AI agents could handle work at a fraction of the cost—document review, due diligence, research, and more.",
    deliverable: "Custom analysis of 3-5 high-impact workflows with cost comparison (manual vs. AI agents) and implementation roadmap.",
    targetAudience: "Managing Partners, COOs at firms with 20-75 attorneys",
    icon: "clock",
  },
  {
    slug: "data-driven-bd",
    title: "Data-Driven BD Assessment",
    description: "Discover what actually predicts your wins vs. what you assume does. We analyze your pitch and client data to find patterns you're missing.",
    deliverable: "Win/loss analysis revealing true success predictors, with data-backed recommendations to improve conversion rates.",
    targetAudience: "Business Development Directors, Practice Group Leaders",
    icon: "trophy",
  },
  {
    slug: "document-intelligence-readiness",
    title: "Document Intelligence Readiness",
    description: "Assess the knowledge locked in your contracts, precedents, and client files—and map the path to making it all AI-searchable and answerable.",
    deliverable: "Document landscape assessment with a roadmap to AI-powered knowledge systems your team can query in plain English.",
    targetAudience: "Managing Partners, Knowledge Management leads",
    icon: "brain",
  },
  {
    slug: "ai-infrastructure",
    title: "AI-Ready Infrastructure Audit",
    description: "Evaluate whether your data, systems, and security posture are ready for privacy-compliant AI deployment—local models that never touch external clouds.",
    deliverable: "Infrastructure readiness report with specific gaps, compliance considerations, and a phased AI adoption plan.",
    targetAudience: "CIOs, Directors of IT, Managing Partners concerned about AI privacy",
    icon: "layers",
  },
];

export const legalGuides: Guide[] = [
  {
    slug: "associate-multiplier",
    title: "The Associate Multiplier",
    subtitle: "How Top Firms Get 3x Output Without Adding Headcount",
    description: "Learn how leading firms are using AI to multiply associate productivity without sacrificing quality or client relationships.",
    topics: [
      "AI-assisted research and drafting workflows",
      "Knowledge management that actually works",
      "Measuring and improving associate productivity",
      "Change management for traditional firms",
    ],
    targetAudience: "Managing Partners, Practice Group Leaders",
    icon: "trending-up",
  },
  {
    slug: "win-more-pitches",
    title: "Win More Pitches",
    subtitle: "Data-Driven Strategies for Legal Business Development",
    description: "Stop leaving money on the table. This guide reveals what data-savvy firms know about winning new business.",
    topics: [
      "Building competitive intelligence systems",
      "Pitch personalization at scale",
      "Measuring BD effectiveness",
      "CRM strategies for relationship-driven sales",
    ],
    targetAudience: "Business Development Directors, Marketing Partners",
    icon: "target",
  },
  {
    slug: "partner-succession",
    title: "The Partner Succession Problem",
    subtitle: "Preserving Institutional Knowledge Before It's Too Late",
    description: "Every retiring partner takes decades of client relationships and expertise with them. Here's how to stop the bleeding.",
    topics: [
      "Knowledge capture strategies that work",
      "Client transition best practices",
      "Building searchable precedent databases",
      "Training the next generation",
    ],
    targetAudience: "Managing Partners, Executive Committees",
    icon: "users",
  },
  {
    slug: "last-vendor",
    title: "The Last Vendor You Need",
    subtitle: "How to Evaluate (and Escape) Legal Tech Fragmentation",
    description: "Your firm probably has 15+ point solutions that don't talk to each other. Learn how to evaluate, consolidate, and integrate.",
    topics: [
      "Auditing your current tech stack",
      "Build vs. buy vs. integrate decisions",
      "Vendor negotiation strategies",
      "Integration architecture for law firms",
    ],
    targetAudience: "CIOs, Directors of IT, COOs",
    icon: "puzzle",
  },
];

// Manufacturing - Self-Service Assessment
export const manufacturingAssessments: Assessment[] = [
  {
    slug: "scale-up-data-readiness",
    title: "Scale-Up Data Readiness Assessment",
    description: "Discover if your data infrastructure is ready to support your next phase of growth. Get a personalized roadmap in 5 minutes.",
    questionCount: 12,
    timeEstimate: "5 minutes",
    targetAudience: "CEOs, COOs at $10M-$100M manufacturers",
    icon: "chart-bar",
  },
];

// Healthcare - Custom Build
export const healthcareAssessments: Assessment[] = [
  {
    slug: "price-transparency-benchmark",
    title: "Healthcare Price Transparency Benchmark",
    description: "See how your pricing compares to competitors in your market. Get a preview of your competitive position.",
    questionCount: 8,
    timeEstimate: "3 minutes",
    targetAudience: "Healthcare administrators, CFOs",
    icon: "dollar",
  },
];

// Industry-specific content for enhanced pages
export const industryLeadMagnets = {
  legal: {
    audits: legalAudits,
    guides: legalGuides,
    headline: "Personalized Audits for Forward-Thinking Firms",
    subheadline: "We don't do one-size-fits-all. Request a custom audit tailored to your firm's specific challenges.",
    ctaText: "Request Your Audit",
  },
  manufacturing: {
    assessments: manufacturingAssessments,
    headline: "Is Your Data Ready for Scale?",
    subheadline: "Take our 5-minute assessment to find out where you stand and what to prioritize.",
    ctaText: "Start Assessment",
  },
  healthcare: {
    assessments: healthcareAssessments,
    headline: "How Do Your Prices Compare?",
    subheadline: "Get a preview of your competitive position in the market.",
    ctaText: "See Your Benchmark",
  },
};

export function getAuditBySlug(slug: string): Audit | undefined {
  return legalAudits.find((a) => a.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return legalGuides.find((g) => g.slug === slug);
}

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return [...manufacturingAssessments, ...healthcareAssessments].find((a) => a.slug === slug);
}
