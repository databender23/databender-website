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
    slug: "associate-efficiency",
    title: "Associate Efficiency Audit",
    description: "Discover how your associates spend their time and identify opportunities to get more output without increasing headcount.",
    deliverable: "Custom report showing time allocation patterns, efficiency benchmarks vs. peer firms, and specific AI opportunities.",
    targetAudience: "Managing Partners, COOs at firms with 20-75 attorneys",
    icon: "clock",
  },
  {
    slug: "pitch-intelligence",
    title: "Pitch Intelligence Assessment",
    description: "Analyze your firm's pitch success rates and identify what separates wins from losses.",
    deliverable: "Win/loss analysis with specific recommendations to improve pitch effectiveness.",
    targetAudience: "Business Development Directors, Practice Group Leaders",
    icon: "trophy",
  },
  {
    slug: "institutional-memory",
    title: "Institutional Memory Audit",
    description: "Assess how much knowledge walks out the door when partners retire and identify preservation strategies.",
    deliverable: "Knowledge risk assessment with a clear preservation roadmap.",
    targetAudience: "Managing Partners at firms facing partner succession",
    icon: "brain",
  },
  {
    slug: "technology-stack",
    title: "Technology Stack Assessment",
    description: "Evaluate your current legal tech stack and identify integration gaps that create inefficiencies.",
    deliverable: "Tech stack audit with consolidation recommendations and ROI projections.",
    targetAudience: "CIOs, Directors of IT at mid-size firms",
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
