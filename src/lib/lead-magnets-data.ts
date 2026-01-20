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
    slug: "ai-cost-analysis",
    title: "Custom AI Cost Analysis",
    description: "See exactly what custom AI would cost for your firm. We analyze your workflows and show you the math: what you're spending now vs. what's possible at $30-50K instead of $150K+.",
    deliverable: "Detailed cost comparison for 3-5 high-value workflows, with specific pricing for document review, research, and due diligence automation.",
    targetAudience: "Managing Partners, COOs at firms with 20-75 attorneys",
    icon: "clock",
  },
  {
    slug: "knowledge-preservation",
    title: "Knowledge Preservation Audit",
    description: "Your senior partners carry decades of expertise. When they retire, it walks out the door. We map what knowledge exists, where it lives, and how to make it searchable before it's gone.",
    deliverable: "Knowledge landscape assessment with a practical plan to capture institutional expertise and make it accessible to every associate.",
    targetAudience: "Managing Partners, Executive Committees",
    icon: "trophy",
  },
  {
    slug: "document-intelligence-readiness",
    title: "Document Intelligence Readiness",
    description: "Every brief, memo, and contract your firm has produced is sitting in folders. We assess what it would take to make it all searchable in plain English, and what that would cost.",
    deliverable: "Document inventory with implementation roadmap and pricing. Know exactly what's involved before you commit.",
    targetAudience: "Managing Partners, Knowledge Management leads",
    icon: "brain",
  },
  {
    slug: "ownership-assessment",
    title: "Build vs. Rent Assessment",
    description: "You're paying per seat for software you don't own. We analyze your current tech spend and show you where custom AI you own outright would cost less over time.",
    deliverable: "Total cost of ownership analysis comparing your current vendor fees to one-time custom builds. See where ownership makes sense.",
    targetAudience: "CIOs, Directors of IT, COOs",
    icon: "layers",
  },
];

export const legalGuides: Guide[] = [
  {
    slug: "associate-multiplier",
    title: "The Associate Multiplier",
    subtitle: "How Top Firms Get 3x Output Without Adding Headcount",
    description: "Your associates spend hours researching things the firm already figured out. This guide shows how to give them instant access to decades of work product.",
    topics: [
      "Making every brief and memo searchable in seconds",
      "Research that takes minutes instead of hours",
      "What this costs now vs. two years ago",
      "Getting your team to actually use it",
    ],
    targetAudience: "Managing Partners, Practice Group Leaders",
    icon: "trending-up",
  },
  {
    slug: "partner-succession",
    title: "The Partner Succession Problem",
    subtitle: "Preserving Institutional Knowledge Before It's Too Late",
    description: "Every retiring partner takes decades of expertise with them. This guide shows how to capture what they know and make it searchable for every associate.",
    topics: [
      "What knowledge capture actually looks like",
      "Making expertise searchable in plain English",
      "What this costs (less than you think)",
      "Getting partners to participate",
    ],
    targetAudience: "Managing Partners, Executive Committees",
    icon: "users",
  },
  {
    slug: "win-more-pitches",
    title: "Win More Pitches",
    subtitle: "A Law Firm's Guide to Experience Intelligence",
    description:
      "You've done the work. Can you find it when it matters? This guide shows how AI transforms pitch preparation from hours of email archaeology to minutes of instant retrieval.",
    topics: [
      "What Experience Intelligence actually means",
      "The retrieval problem (partner memory, broken DMS, hidden relationships)",
      "From 6 hours to 15 minutes: the transformation",
      "The economics: $30-50K vs. $150-200K (comparable scope)",
      "Privacy-first AI that stays on your servers",
      "The ownership model vs. per-seat licensing",
    ],
    targetAudience: "Managing Partners, Business Development Directors",
    icon: "trophy",
  },
  {
    slug: "simplify-tech-stack",
    title: "Simplify Your Legal Tech Stack",
    subtitle: "Stop Managing Five Vendors Who Point Fingers",
    description: "Most firms run six or more tools that barely talk to each other. This guide shows how to consolidate your knowledge technology with a single accountable partner.",
    topics: [
      "The vendor fragmentation problem",
      "What integration actually requires",
      "The full-stack partner model",
      "Build vs. buy vs. partner",
    ],
    targetAudience: "Managing Partners, CIOs, COOs",
    icon: "layers",
  },
  {
    slug: "own-your-ai",
    title: "Own Your AI",
    subtitle: "Why Per-Seat Licensing Is Eating Your Margins",
    description: "You're paying per seat for software you don't own. This guide shows where custom AI you own outright costs less over time, with no vendor lock-in.",
    topics: [
      "The real cost of per-seat licensing over 5 years",
      "Where custom builds make financial sense",
      "What ownership actually means (you keep the code)",
      "Getting ethics committee approval",
    ],
    targetAudience: "Managing Partners, CIOs, COOs",
    icon: "puzzle",
  },
  {
    slug: "economics-of-legal-ai",
    title: "The Economics Changed",
    subtitle: "Projects That Cost $150-200K Now Cost $30-50K",
    description: "Custom legal technology was out of reach for mid-sized firms. Not anymore. This guide breaks down exactly what's possible and what it costs (comparable scope).",
    topics: [
      "Why prices dropped 80% in two years",
      "Real project costs from real firms",
      "Build timelines: weeks, not months",
      "The firms moving now vs. waiting",
    ],
    targetAudience: "Managing Partners, COOs, Executive Committees",
    icon: "target",
  },
];

// Healthcare Guides
export const healthcareGuides: Guide[] = [
  {
    slug: "hipaa-compliant-ai",
    title: "HIPAA-Compliant AI",
    subtitle: "How to Deploy AI That Never Leaves Your Building",
    description: "Most AI tools want your patient data in their cloud. That's not an option. This guide shows what on-premise AI actually looks like, what it costs, and how to get your compliance team to say yes.",
    topics: [
      "What on-premise AI costs (spoiler: less than you think)",
      "Questions to ask vendors about where your data actually goes",
      "Getting compliance sign-off without a six-month review",
      "The business case that got one health system approved in weeks",
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
    subtitle: "From 15 Minutes to 30 Seconds",
    description: "Your staff spends hours hunting for protocols that should take seconds to find. This guide shows how to turn scattered documents into a searchable knowledge base your team can actually use.",
    topics: [
      "Protocol lookups in 30 seconds instead of 15 minutes",
      "Plain English questions, instant answers with sources",
      "Works with Epic, Cerner, or whatever you have",
      "Getting staff to actually use it (the adoption playbook)",
    ],
    targetAudience: "Operations Directors, Clinical Informatics",
    icon: "document-search",
  },
  {
    slug: "prior-auth-burden",
    title: "The Prior Authorization Problem",
    subtitle: "13 Hours a Week Per Physician. Here's How to Fix It.",
    description: "Prior authorization eats 13 hours per physician per week. 93% of physicians report care delays. 90% of imaging now requires PA. This guide shows how document intelligence cuts the paperwork burden and gets patients treated faster.",
    topics: [
      "The real cost of PA: time, delays, and denied care",
      "How document intelligence automates PA workflows",
      "Reducing physician time spent on paperwork by 60%+",
      "Integration with your existing EHR and payer systems",
      "ROI math that gets CFO approval",
    ],
    targetAudience: "COOs, Practice Administrators, Revenue Cycle Directors",
    icon: "clock",
  },
  {
    slug: "pe-healthcare-operations",
    title: "PE Portfolio Operations",
    subtitle: "Portfolio-Wide Visibility Without the 18-Month Integration",
    description: "You bought five practices. Now you have five sets of books, five different PM systems, and no consolidated view. This guide shows how to get portfolio-wide visibility in weeks, not the 18 months your integration vendor quoted.",
    topics: [
      "Unified dashboards across acquired entities",
      "Standardizing metrics without standardizing systems",
      "EBITDA improvement opportunities hiding in your data",
      "Exit-ready reporting that buyers actually want",
      "What to prioritize first (and what can wait)",
    ],
    targetAudience: "PE Operating Partners, Portfolio Company COOs, CFOs",
    icon: "layers",
  },
];

// Manufacturing Guides
export const manufacturingGuides: Guide[] = [
  {
    slug: "do-more-with-fewer-people",
    title: "Do More With Fewer People",
    subtitle: "How Growing Manufacturers Get 20% More Output Without Adding Headcount",
    description: "You can't find enough people, and the ones you have are stretched thin. Here's how to get more done without adding to payroll.",
    topics: [
      "Where time disappears in a typical manufacturer",
      "The force multiplier effect of visibility",
      "CSR productivity: before and after",
      "What this costs and what it returns",
    ],
    targetAudience: "CEOs, COOs",
    icon: "users",
  },
  {
    slug: "operational-visibility-playbook",
    title: "The Operational Visibility Playbook",
    subtitle: "Stop Hunting for Answers Across Spreadsheets",
    description: "Sales doesn't know what shipped. Production doesn't know what's promised. Here's how to get everyone seeing the same picture without replacing your systems.",
    topics: [
      "Connecting systems without replacing them",
      "Building dashboards people actually check",
      "Catching at-risk orders before they're late",
      "Breaking down departmental silos",
    ],
    targetAudience: "COOs, Operations Directors",
    icon: "eye",
  },
  {
    slug: "90-day-data-roadmap",
    title: "The 90-Day Data Roadmap",
    subtitle: "From Spreadsheets to Unified Visibility in One Quarter",
    description: "Most manufacturers wait 12+ months for data infrastructure results. Here's how to see value in 90 days.",
    topics: [
      "Days 1-30: First dashboard live",
      "Days 31-60: Cross-system visibility",
      "Days 61-90: Proactive alerts and automation",
      "What to tackle first (and what can wait)",
    ],
    targetAudience: "CEOs, COOs",
    icon: "calendar",
  },
  {
    slug: "manufacturing-ai-privacy",
    title: "AI Without the Cloud Risk",
    subtitle: "Keep Your Competitive Data Where It Belongs",
    description: "Your pricing and customer data are competitive advantage. Here's how to get AI capabilities without sending sensitive data to someone else's servers.",
    topics: [
      "On-premise AI deployment options",
      "What stays private vs. what's safe to share",
      "Getting IT and legal to say yes",
      "The real cost of private AI (less than you think)",
    ],
    targetAudience: "COOs, IT Directors",
    icon: "shield",
  },
  {
    slug: "supply-chain-visibility-playbook",
    title: "The Supply Chain Visibility Playbook",
    subtitle: "Know What's Coming Before It's a Problem",
    description: "Supplier delays shouldn't surprise you. Here's how to see what's at risk before it blows up your production schedule.",
    topics: [
      "Connecting supplier data without their cooperation",
      "Early warning systems that actually work",
      "Vendor scorecards that drive conversations",
      "What to track (and what's noise)",
    ],
    targetAudience: "COOs, Supply Chain Managers",
    icon: "truck",
  },
  {
    slug: "erp-integration-guide",
    title: "The ERP Integration Guide",
    subtitle: "Connect Your Systems Without Replacing Anything",
    description: "Your ERP holds the data. Getting it out is the hard part. Here's how to build visibility on top of NetSuite, Epicor, SAP, or whatever you're running.",
    topics: [
      "Read-only connections that don't disrupt operations",
      "What your ERP can and can't tell you",
      "Building dashboards your team will actually use",
      "The 30-day path to your first live view",
    ],
    targetAudience: "IT Directors, COOs",
    icon: "link",
  },
];

// Commercial Real Estate Guides - Brokers & Investors
export const creBrokerGuides: Guide[] = [
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
  {
    slug: "debt-maturity-wall",
    title: "Navigating the $957B Maturity Wall",
    subtitle: "How CRE Professionals Turn Debt Pressure Into Deal Flow",
    description: "$957B in CRE loans mature in 2025, nearly triple the 20-year average. Borrowers face 200 basis point rate shocks, and only 21% can pay off in full. This guide shows how to identify motivated sellers before they list.",
    topics: [
      "Why 2025-2026 is unlike anything in 20 years",
      "Identifying owners facing refinancing pressure",
      "Building debt visibility into your deal pipeline",
      "Reaching distressed sellers before competitors",
    ],
    targetAudience: "Acquisition Directors, Investment Sales Brokers",
    icon: "trending-up",
  },
];

// Commercial Real Estate Guides - Property Managers
export const crePropertyManagerGuides: Guide[] = [
  {
    slug: "portfolio-visibility-cre",
    title: "One View, All Properties",
    subtitle: "How to See Your Whole Portfolio Without the Spreadsheet Gymnastics",
    description: "Yardi here, AppFolio there, MRI somewhere else. Getting a unified view takes days. This guide shows how to connect your systems without replacing them.",
    topics: [
      "Connecting PM systems without migration",
      "Building dashboards that update themselves",
      "Occupancy, NOI, and collections in one place",
      "What this costs (less than you think)",
    ],
    targetAudience: "Property Managers, Directors of Operations",
    icon: "eye",
  },
  {
    slug: "investor-reporting-cre",
    title: "Investor Reports in a Day",
    subtitle: "Stop the Quarterly Scramble (ILPA-Compliant)",
    description: "Quarterly reporting eats two weeks. Pull data from each property. Consolidate in Excel. Format for presentation. Fix the errors. This guide shows how to cut that to a day with ILPA-compliant output.",
    topics: [
      "Automating the data pull",
      "Report templates that populate themselves",
      "ILPA 2.0 compliance requirements",
      "Catching errors before investors do",
    ],
    targetAudience: "Asset Managers, Portfolio Managers, CFOs",
    icon: "file-text",
  },
  {
    slug: "lease-intelligence-cre",
    title: "Catch Renewals Before They Slip",
    subtitle: "6 Months of Visibility Instead of 30 Days",
    description: "Most property managers find out about lease expirations too late to negotiate properly. This guide shows how to build a renewal pipeline that surfaces opportunities months ahead.",
    topics: [
      "Building a 6-9 month renewal pipeline",
      "Identifying below-market leases",
      "Prioritizing by revenue impact",
      "Negotiation timing that actually works",
    ],
    targetAudience: "Property Managers, Leasing Directors",
    icon: "calendar",
  },
  {
    slug: "cam-reconciliation-guide",
    title: "CAM Reconciliation: Stop Losing 5-15%",
    subtitle: "How Property Managers Recover Lost Expenses Without Adding Staff",
    description: "Property managers lose 5-15% of recoverable expenses to CAM calculation errors. Nobody catches them until tenants dispute. This guide shows how to automate reconciliation and recover what's yours.",
    topics: [
      "The hidden cost of CAM errors (real numbers)",
      "Where reconciliation breaks down",
      "Automation that works across lease types",
      "Catching errors before disputes",
      "ROI math for your CFO",
    ],
    targetAudience: "Property Managers, COOs, CFOs",
    icon: "dollar",
  },
];

// Combined for backward compatibility
export const creGuides: Guide[] = [...creBrokerGuides, ...crePropertyManagerGuides];

// Construction Guides
export const constructionGuides: Guide[] = [
  {
    slug: "project-visibility-playbook",
    title: "The Project Visibility Playbook",
    subtitle: "Stop Hunting for Answers Across Five Different Systems",
    description: "Your data is scattered across estimating, scheduling, field apps, and accounting. This guide shows how to connect them all without replacing anything.",
    topics: [
      "Connecting Procore, accounting, and field apps",
      "Building dashboards that update themselves",
      "Answering 'how's this project doing?' in 30 seconds",
      "What this costs (less than you think)",
    ],
    targetAudience: "CEOs, CFOs, Operations Directors",
    icon: "eye",
  },
  {
    slug: "change-order-recovery",
    title: "Stop Leaving Money on the Table",
    subtitle: "How to Capture Every Change Order Before It Slips Through",
    description: "Change orders get approved in the field but never billed. This guide shows how to track every one and recover the 2-5% of revenue most contractors give away.",
    topics: [
      "Automatic change order tracking from field to billing",
      "Alerts before unbilled work ages out",
      "Integrating with your existing billing workflow",
      "The ROI math on change order recovery",
    ],
    targetAudience: "CFOs, Project Managers, Controllers",
    icon: "dollar",
  },
  {
    slug: "construction-post-acquisition",
    title: "Post-Acquisition Visibility",
    subtitle: "Unified Reporting in Weeks, Not the 18-Month Integration Timeline",
    description: "You bought a company. Now you have two sets of books and no consolidated view. This guide shows how to get portfolio-wide visibility before full system migration.",
    topics: [
      "Unified dashboards across acquired entities",
      "Standardizing job costing across companies",
      "Board-ready reporting in weeks",
      "What to tackle first (and what can wait)",
    ],
    targetAudience: "CEOs, CFOs, PE Operating Partners",
    icon: "layers",
  },
];

// Wholesale Distribution Guides
export const distributionGuides: Guide[] = [
  {
    slug: "inventory-intelligence-guide",
    title: "Free Up Cash Tied in Dead Stock",
    subtitle: "Inventory Intelligence for Mid-Sized Distributors",
    description: "15-25% of your revenue is tied up in inventory. Too much of the wrong stuff, not enough of the right. This guide shows how to optimize without guessing.",
    topics: [
      "Identifying dead stock before it becomes a write-off",
      "Demand forecasting that actually predicts",
      "Optimizing reorder points by SKU",
      "From 4x to 6x inventory turns",
    ],
    targetAudience: "CEOs, COOs, Inventory Managers",
    icon: "package",
  },
  {
    slug: "customer-profitability-distribution",
    title: "Know Who Actually Makes You Money",
    subtitle: "Customer Profitability for Distributors",
    description: "Your top 10 customers by revenue might not be your top 10 by profit. This guide shows how to see true margin after cost-to-serve.",
    topics: [
      "Calculating true customer profitability",
      "Cost-to-serve analysis that makes sense",
      "Aligning sales comp to margin, not volume",
      "The conversations that change customer behavior",
    ],
    targetAudience: "CEOs, CFOs, Sales VPs",
    icon: "users",
  },
  {
    slug: "pricing-discipline-distribution",
    title: "Stop Giving Away Margin",
    subtitle: "Pricing Visibility and Guardrails for Distribution",
    description: "Pricing lives in spreadsheets and sales rep heads. Deals go out the door below margin and nobody knows until year-end. This guide fixes that.",
    topics: [
      "Real-time margin visibility by deal",
      "Pricing guardrails that don't slow down sales",
      "Exception alerts before approval",
      "2-5% margin improvement from discipline alone",
    ],
    targetAudience: "CEOs, CFOs, Sales VPs",
    icon: "shield",
  },
  {
    slug: "distribution-labor-shortage-playbook",
    title: "Do More With Fewer People",
    subtitle: "The Labor Shortage Playbook for Distributors",
    description: "76% of distributors report labor shortages. Fulfillment times are up 60%. You can't hire your way out. This playbook shows how to get more done with your current team.",
    topics: [
      "Where time disappears in distribution operations",
      "Customer service productivity: before and after",
      "Warehouse efficiency without adding headcount",
      "Forecasting that reduces peak season chaos",
      "The ROI math on operational visibility",
    ],
    targetAudience: "CEOs, COOs, Operations Directors",
    icon: "users",
  },
  {
    slug: "distribution-tariff-response-guide",
    title: "Respond to Tariffs Fast",
    subtitle: "Pricing Agility for Uncertain Markets",
    description: "When tariffs change or suppliers raise costs, you need to adjust pricing fast. By the time you update spreadsheets, margin is already gone. This guide shows how to build pricing infrastructure that responds in hours, not weeks.",
    topics: [
      "Scenario modeling before cost changes hit",
      "Updating pricing at scale across SKUs and customers",
      "Margin guardrails that adjust with costs",
      "Tracking whether price increases stick",
      "The supplier cost pass-through playbook",
    ],
    targetAudience: "CEOs, CFOs, Sales VPs",
    icon: "trending-up",
  },
];

// Manufacturing - Self-Service Assessment
export const manufacturingAssessments: Assessment[] = [
  {
    slug: "scale-up-data-readiness",
    title: "Manufacturing Operations Assessment",
    description: "See where you're losing time to spreadsheets, phone calls, and firefighting. Get a personalized roadmap in 5 minutes.",
    questionCount: 12,
    timeEstimate: "5 minutes",
    targetAudience: "CEOs, COOs at $10M-$100M manufacturers",
    icon: "chart-bar",
  },
];

// Healthcare Assessments
export const healthcareAssessments: Assessment[] = [
  {
    slug: "healthcare-ai-readiness",
    title: "Healthcare AI Readiness Assessment",
    description: "See where your organization stands on document management, knowledge retention, and AI readiness. Get a personalized roadmap in 5 minutes.",
    questionCount: 12,
    timeEstimate: "5 minutes",
    targetAudience: "CIOs, COOs, Clinical Informatics Directors",
    icon: "chart-bar",
  },
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

// Commercial Real Estate Assessments
export const creAssessments: Assessment[] = [
  {
    slug: "deal-intelligence",
    title: "Deal Intelligence Assessment",
    description: "How fast can you find owners, review data rooms, and prioritize your pipeline? See where you stand and what faster deal flow could look like.",
    questionCount: 10,
    timeEstimate: "4 minutes",
    targetAudience: "Acquisition Directors, Deal Teams, Investment Sales Brokers",
    icon: "target",
  },
  {
    slug: "portfolio-analytics",
    title: "Portfolio Analytics Assessment",
    description: "See where your portfolio analytics stand. How long does reporting take? Can you see all properties in one place? Get a personalized roadmap.",
    questionCount: 8,
    timeEstimate: "4 minutes",
    targetAudience: "Property Managers, Asset Managers, Portfolio Managers",
    icon: "chart-bar",
  },
];

// Construction Assessments
export const constructionAssessments: Assessment[] = [
  {
    slug: "data-ai-readiness",
    title: "Construction Operations Assessment",
    description: "See where you're losing time to disconnected systems and scattered project data. Get a personalized roadmap in 5 minutes.",
    questionCount: 12,
    timeEstimate: "5 minutes",
    targetAudience: "CEOs, CFOs, Operations Directors at growing contractors",
    icon: "chart-bar",
    externalUrl: "/assessments/data-ai-readiness",
  },
];

// Wholesale Distribution Assessments
export const distributionAssessments: Assessment[] = [
  {
    slug: "data-ai-readiness",
    title: "Distribution Operations Assessment",
    description: "See where you're losing margin to inventory guesswork, pricing chaos, and manual processes. Get a personalized roadmap in 5 minutes.",
    questionCount: 12,
    timeEstimate: "5 minutes",
    targetAudience: "CEOs, COOs, CFOs at mid-sized distributors",
    icon: "chart-bar",
    externalUrl: "/assessments/data-ai-readiness",
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
    headline: "How Much Time Are You Losing to Firefighting?",
    subheadline: "5-minute assessment. Find out where you're bleeding time and what to fix first.",
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
    assessments: creAssessments,
    guides: creGuides,
    brokerGuides: creBrokerGuides,
    propertyManagerGuides: crePropertyManagerGuides,
    headline: "Resources for CRE Professionals",
    subheadline: "Guides and assessments for brokers chasing deals and property managers running portfolios.",
    ctaText: "Get Started",
  },
  construction: {
    assessments: constructionAssessments,
    guides: constructionGuides,
    headline: "Resources for Growing Contractors",
    subheadline: "See where your operations stand and get practical guides for project visibility and change order recovery.",
    ctaText: "Start Assessment",
  },
  "wholesale-distribution": {
    assessments: distributionAssessments,
    guides: distributionGuides,
    headline: "Resources for Mid-Sized Distributors",
    subheadline: "See where your operations stand and get practical guides for inventory optimization and pricing discipline.",
    ctaText: "Start Assessment",
  },
};

export function getAuditBySlug(slug: string): Audit | undefined {
  return legalAudits.find((a) => a.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  const allGuides = [...legalGuides, ...healthcareGuides, ...manufacturingGuides, ...creGuides, ...constructionGuides, ...distributionGuides];
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
    case "construction":
      return constructionGuides;
    case "wholesale-distribution":
      return distributionGuides;
    default:
      return [];
  }
}

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return [...manufacturingAssessments, ...healthcareAssessments, ...creAssessments, ...constructionAssessments, ...distributionAssessments].find((a) => a.slug === slug);
}
