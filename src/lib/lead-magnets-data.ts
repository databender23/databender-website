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

// Healthcare Guides
export const healthcareGuides: Guide[] = [
  {
    slug: "hipaa-compliant-ai",
    title: "HIPAA-Compliant AI",
    subtitle: "How to Deploy AI That Never Leaves Your Building",
    description: "Learn how to evaluate and deploy AI tools that meet HIPAA requirements, run on your own infrastructure, and keep patient data where it belongs.",
    topics: [
      "On-premise AI deployment options and requirements",
      "Evaluating vendors for true data privacy",
      "Getting compliance and legal approval",
      "Building the business case for private AI",
    ],
    targetAudience: "CIOs, Compliance Officers, IT Directors",
    icon: "shield",
  },
  {
    slug: "institutional-knowledge-healthcare",
    title: "Capturing Institutional Knowledge",
    subtitle: "Before Your Best People Retire, Capture What They Know",
    description: "Your experienced staff carry decades of knowledge that walks out the door when they leave. This guide shows you how to capture it before it's too late.",
    topics: [
      "Knowledge capture systems that actually get used",
      "Making expertise searchable for everyone",
      "Cutting new hire training time in half",
      "Succession planning that preserves what matters",
    ],
    targetAudience: "COOs, Department Heads, HR Directors",
    icon: "brain",
  },
  {
    slug: "document-intelligence-healthcare",
    title: "Document Intelligence for Healthcare",
    subtitle: "From Scattered PDFs to Instant Answers",
    description: "Stop hunting through folders. Learn how AI-powered document search lets your team ask questions in plain English and get instant answers from your own files.",
    topics: [
      "Building searchable document systems",
      "Protocol and policy lookup in seconds",
      "Connecting to your existing EHR systems",
      "Training staff on AI-assisted search",
    ],
    targetAudience: "Operations Directors, Clinical Informatics",
    icon: "document-search",
  },
];

// Manufacturing Guides
export const manufacturingGuides: Guide[] = [
  {
    slug: "data-cleanup-manufacturing",
    title: "The Data Cleanup Playbook",
    subtitle: "Fix Your Customer Data in Weeks, Not Months",
    description: "Your customer database is a mess. Same person listed five ways, contacts at the wrong companies, duplicates everywhere. Here's how to fix it fast.",
    topics: [
      "Identifying and merging duplicate records",
      "AI-powered entity matching at scale",
      "CRM cleanup without losing history",
      "Preventing data decay going forward",
    ],
    targetAudience: "COOs, IT Directors, Sales Operations",
    icon: "database",
  },
  {
    slug: "lead-scoring-manufacturing",
    title: "Lead Scoring That Actually Works",
    subtitle: "What 3 Years of Sales Data Taught Us",
    description: "Most lead scores are based on guesses. We analyzed three years of actual sales data to find what really predicts who buys. Some answers will surprise you.",
    topics: [
      "Building scores from actual win data",
      "The features that matter (and don't)",
      "Validating models before deployment",
      "Getting sales to trust the scores",
    ],
    targetAudience: "Sales VPs, Marketing Directors",
    icon: "chart-bar",
  },
  {
    slug: "operational-visibility",
    title: "Real-Time Operational Visibility",
    subtitle: "Know What's Happening Without Making Phone Calls",
    description: "Sales doesn't know what shipped. Production doesn't know what's promised. Stop playing telephone and start seeing everything in one place.",
    topics: [
      "Connecting systems without replacing them",
      "Dashboards that people actually check",
      "Alerts that catch problems early",
      "Breaking down departmental silos",
    ],
    targetAudience: "COOs, Operations Directors",
    icon: "eye",
  },
];

// Commercial Real Estate Guides
export const creGuides: Guide[] = [
  {
    slug: "entity-resolution-cre",
    title: "Untangling Ownership",
    subtitle: "How to Find the Real Decision-Maker Behind LLCs and Trusts",
    description: "The property is owned by an LLC, owned by a trust, managed by another LLC. Learn how to trace through the layers and find the actual person who makes decisions.",
    topics: [
      "Tracing ownership through entity structures",
      "Matching names across messy databases",
      "Building verified contact lists",
      "Getting to decision-makers faster than competitors",
    ],
    targetAudience: "Acquisition Directors, Deal Teams",
    icon: "link",
  },
  {
    slug: "data-room-review",
    title: "AI-Powered Due Diligence",
    subtitle: "Review Data Rooms Overnight Instead of Next Month",
    description: "Data room reviews take weeks because someone has to read every document. AI changes the math. Get summaries in the morning instead of next month.",
    topics: [
      "Automated document extraction and analysis",
      "Flagging risks before you're committed",
      "Lease term extraction at scale",
      "Financial document review and comparison",
    ],
    targetAudience: "Acquisitions, Asset Managers",
    icon: "folder-open",
  },
  {
    slug: "deal-prioritization",
    title: "Smart Deal Prioritization",
    subtitle: "Know Which 100 of 10,000 Targets to Call First",
    description: "You have thousands of potential targets. Only some will trade. Learn to score opportunities based on what actually predicts a sale.",
    topics: [
      "Building scoring models from transaction data",
      "Signals that indicate motivated sellers",
      "Timing outreach to market conditions",
      "Focusing BD resources where they'll hit",
    ],
    targetAudience: "Business Development, Investment Teams",
    icon: "trending-up",
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
    guides: manufacturingGuides,
    headline: "Is Your Data Ready for Scale?",
    subheadline: "Take our 5-minute assessment to find out where you stand and what to prioritize.",
    ctaText: "Start Assessment",
  },
  healthcare: {
    assessments: healthcareAssessments,
    guides: healthcareGuides,
    headline: "Resources for Healthcare Leaders",
    subheadline: "Practical guides for deploying AI that keeps patient data private and captures institutional knowledge.",
    ctaText: "Download Free Guide",
  },
  "commercial-real-estate": {
    guides: creGuides,
    headline: "Resources for CRE Professionals",
    subheadline: "Guides to finding owners, speeding due diligence, and prioritizing deals.",
    ctaText: "Download Free Guide",
  },
};

export function getAuditBySlug(slug: string): Audit | undefined {
  return legalAudits.find((a) => a.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  const allGuides = [...legalGuides, ...healthcareGuides, ...manufacturingGuides, ...creGuides];
  return allGuides.find((g) => g.slug === slug);
}

export function getGuidesByIndustry(industry: string): Guide[] {
  switch (industry) {
    case "legal":
      return legalGuides;
    case "healthcare":
      return healthcareGuides;
    case "manufacturing":
      return manufacturingGuides;
    case "commercial-real-estate":
      return creGuides;
    default:
      return [];
  }
}

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return [...manufacturingAssessments, ...healthcareAssessments].find((a) => a.slug === slug);
}
