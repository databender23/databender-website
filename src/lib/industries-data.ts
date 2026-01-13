import type { Industry } from "@/types";

export interface IndustryWithCta extends Industry {
  ctaText?: string;
  ctaHref?: string;
  ctaSubtext?: string;
}

export const industries: IndustryWithCta[] = [
  {
    slug: "legal",
    title: "Legal",
    description: "Knowledge management, client intelligence, and business development tools for law firms that want results, not more software.",
    icon: "scale",
    ctaText: "Download Free Guides",
    ctaHref: "/industries/legal#guides",
    ctaSubtext: "Practical resources for forward-thinking firms",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Years of clinical knowledge locked in documents. AI that finally understands them, without your data leaving the building.",
    icon: "heart",
    lottie: "/animations/healthcare-industry.json",
    ctaText: "See Document Intelligence",
    ctaHref: "/case-studies/agentic-document-intelligence",
    ctaSubtext: "How AI turns documents into searchable knowledge",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "AI that actually closes deals. We resolved 1.69M ownership records at 125x less cost than manual review. Now you know exactly who to call and can process data rooms in hours, not weeks.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
    ctaText: "See the Case Study",
    ctaHref: "/case-studies/army-of-ai-agents",
    ctaSubtext: "How AI agents resolved 1.69M broken ownership records",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "AI agents that fix your messy data, score leads better than your CRM, and turn decades of specs and procedures into answers anyone can find.",
    icon: "factory",
    lottie: "/animations/manufacturing-industry.json",
    ctaText: "Take the Readiness Assessment",
    ctaHref: "/assessments/manufacturing",
    ctaSubtext: "5-minute assessment for growing manufacturers",
  },
];

export const industryContent: Record<string, {
  challenges: string[];
  solutions: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
}> = {
  "healthcare": {
    challenges: [
      "Years of clinical knowledge locked in documents AI tools can't access",
      "Staff spending more time on paperwork than patients",
      "Every AI tool wants your data in the cloud. That's a dealbreaker.",
      "Answers buried across systems, documents, and people's heads",
      "Legacy EHR that nothing integrates with",
    ],
    solutions: [
      { title: "Document Intelligence", description: "AI reads prior auth requests, clinical documents, formularies, and policy manuals. Extracts what matters, routes it where it belongs. No manual data entry from paper." },
      { title: "Knowledge Management", description: "Every protocol, policy, and clinical reference searchable by anyone. Institutional knowledge that stays when people leave, accessible from day one." },
      { title: "AI Research Agents", description: "Agents that scan clinical literature, synthesize findings, and surface relevant protocols. Hours of research condensed into minutes, with citations." },
      { title: "AI That Stays In-House", description: "Everything runs on your servers. PHI never leaves. Your compliance officer will actually approve this one." },
      { title: "Natural Language Answers", description: "Your team asks in plain English: 'What's our referral protocol?' 'Which payer is slowest?' AI searches your data and documents, answers with sources." },
      { title: "Modern Data Layer", description: "Connect Epic, Cerner, or that legacy system nobody wants to touch. Pull data into a unified layer without disrupting clinical workflows." },
    ],
    benefits: [
      { title: "Knowledge That Stays", description: "Policies, protocols, and institutional expertise searchable by everyone, forever. When people leave, the knowledge doesn't." },
      { title: "Staff That Can Breathe", description: "Less time on paperwork and hunting for answers. More time with patients." },
      { title: "AI Without the Risk", description: "PHI stays on your servers. Compliance stays simple. No third-party exposure." },
      { title: "Research in Minutes", description: "Clinical literature reviewed and synthesized. AI delivers summaries with citations, not reading lists." },
      { title: "Systems That Finally Connect", description: "Your EHR, billing, and scheduling talking to each other without a rip-and-replace." },
      { title: "Revenue Intelligence", description: "Process price transparency data to see what competitors get paid. Walk into payer negotiations with data." },
    ],
    useCases: [
      { title: "Prior Auth in Minutes", description: "AI gathers required documentation, checks payer requirements, drafts the submission. Your staff reviews and sends." },
      { title: "Clinical Protocol Search", description: "'What's our sepsis protocol?' 'Show me the formulary for this drug class.' Instant answers with links to source documents." },
      { title: "Policy & Procedure Q&A", description: "New hires search every policy from day one. No more hunting through SharePoint or asking around." },
      { title: "Clinical Literature Review", description: "Need the latest on a treatment? AI scans the literature and delivers a summary with citations. Research in minutes." },
      { title: "Intake Without Data Entry", description: "Patients complete forms. AI extracts, validates, and routes. No one re-types into the EHR." },
      { title: "Insurance Card Processing", description: "AI reads insurance cards, extracts member IDs, group numbers, and payer info. Eligibility checks start automatically." },
    ],
  },
  "legal": {
    challenges: [
      "Associates spending 60% of their time on work that doesn't require a law degree",
      "Knowledge walking out the door every time a partner retires, and no way to get it back",
      "BD strategies based on assumptions about what wins pitches, not actual data on what works",
      "15+ software systems that don't talk to each other, and no AI-ready data foundation",
      "Every AI tool wants your client data in the cloud. That's an ethics headache you can't afford.",
    ],
    solutions: [
      { title: "Autonomous AI Agents", description: "AI that handles entire workflows (document review, due diligence, research) at a fraction of manual cost. Not assistants that wait for prompts. Agents that work while you sleep." },
      { title: "Document Intelligence", description: "Turn decades of contracts, precedents, and briefs into an AI-searchable knowledge base. Ask in plain English, get instant answers with sources. New documents automatically expand what AI knows." },
      { title: "AI That Stays In-House", description: "Client files never leave your servers. No OpenAI, no third-party clouds. Privilege stays intact. Your ethics committee will actually approve this." },
      { title: "Data-Driven BD", description: "Discover what actually predicts your wins, not what you assume does. We analyze your pitch history and find patterns you're missing. 31% better conversion when you optimize for reality." },
      { title: "Research in Minutes", description: "AI agents search case law, synthesize holdings, and draft memos with citations. Days of research, delivered in an hour." },
      { title: "Client Intelligence", description: "See every touchpoint across every partner. Spot expansion opportunities before competitors do." },
    ],
    benefits: [
      { title: "Associates That Bill More", description: "Less time on research and first drafts. More time on work that clients actually value." },
      { title: "Knowledge That Compounds", description: "Every matter makes the next one easier. Precedents, clauses, and expertise searchable by everyone." },
      { title: "Privacy Without Compromise", description: "AI capabilities without cloud exposure. Ethics committee approved." },
      { title: "Pitches That Win", description: "Walk in knowing more about the prospect than they expect. Relationship history at your fingertips." },
      { title: "Due Diligence in Days", description: "AI reads the data room while associates review. Faster closes, happier clients." },
      { title: "Partners That Sleep Better", description: "Knowledge doesn't walk out the door. Client relationships aren't trapped in inboxes." },
    ],
    useCases: [
      { title: "Due Diligence Acceleration", description: "AI reads the data room. Flags issues. Generates the diligence memo. What took 200 associate hours now takes 20." },
      { title: "Contract Analysis at Scale", description: "Reviewing 500 contracts for a portfolio? AI extracts terms, compares across documents, and flags outliers." },
      { title: "Precedent Search", description: "'Find every contract where we used this indemnification clause.' AI searches 10 years of matters and delivers results in minutes." },
      { title: "Partner Knowledge Capture", description: "Retiring partner's 30 years of expertise captured and searchable. New associates learn from the best, even after they're gone." },
      { title: "Pitch Preparation", description: "AI pulls relationship history, past matters, industry context. Walk into the pitch knowing everything." },
      { title: "Brief Drafting Assist", description: "AI generates first drafts with relevant case citations. Associates refine and finalize. Same quality, faster delivery." },
    ],
  },
  "commercial-real-estate": {
    challenges: [
      "Public property data exists but it's a mess no one can actually use",
      "The real owner is hiding behind three LLCs and a Delaware trust",
      "Data rooms take weeks to process. You're deep in the deal before you find the red flags.",
      "Too many potential targets, no way to know which ones to call first",
      "Your outreach is generic because you can't personalize at scale",
    ],
    solutions: [
      { title: "AI-Powered Data Cleanup", description: "Messy public records, inconsistent formats, duplicate entries. AI agents clean it all at 125x less cost than manual review. The same approach that resolved 1.69M broken ownership records for an energy client." },
      { title: "Ownership Intelligence", description: "AI agents trace ownership through LLCs, trusts, and holding companies. They reason through the mess like a human would, but process thousands of records in parallel. Know who really owns what before you reach out." },
      { title: "Document Intelligence", description: "AI reads leases, rent rolls, and financials in the data room. Extracts terms, renewal dates, escalations, and red flags. What took a paralegal a week takes an hour." },
      { title: "Deal Scoring", description: "Hold period analysis, tax burden, loan maturity dates. AI scores every property by likelihood to trade, trained on actual outcomes, not assumptions. When you have 10,000 targets, scoring tells you which 100 to call first." },
      { title: "Personalized Outreach at Scale", description: "Each mailer reflects the specific property, owner history, and market context. Mass outreach that doesn't feel mass." },
      { title: "Market Intelligence", description: "AI agents gather comps, track transactions, and monitor market activity in the background. Research that's always current, ready when you need it." },
    ],
    benefits: [
      { title: "125x Cost Savings on Data Cleanup", description: "AI agents do the work of 50 analysts. Ownership records resolved in hours, not months." },
      { title: "Due Diligence in Hours", description: "Leases abstracted, financials extracted, red flags surfaced. Data rooms processed while you sleep." },
      { title: "Know Who to Call", description: "Ownership traced through LLCs and trusts. The real decision-maker, not a dead end." },
      { title: "Work the Best Deals First", description: "Scoring based on actual conversion patterns tells you where to focus." },
      { title: "Deal Flow You Control", description: "Stop waiting for brokers. Source your own off-market opportunities at scale." },
      { title: "Competitive Edge Stays Yours", description: "Your pipeline and pricing models can stay on your servers. AI capabilities without third-party exposure." },
    ],
    useCases: [
      { title: "Ownership Resolution at Scale", description: "1.69M records with broken IDs: same person scattered across entries, same ID assigned to different people. AI agents resolved it in hours at 125x less cost than manual review." },
      { title: "Data Room Processing", description: "AI extracts from rent rolls, leases, and financials. Surfaces issues before you're too deep in the deal. Hours instead of weeks." },
      { title: "Off-Market Deal Sourcing", description: "Find owners before they list. See who's held properties for 10+ years, who's paying high taxes, who might be motivated. All with clean data you can trust." },
      { title: "Direct-to-Owner Campaigns", description: "Personalized mailers at scale. Each offer reflects the specific property, owner history, and market context." },
      { title: "Lead Prioritization", description: "Score every opportunity by likelihood to convert. Work the best leads first, not just the newest." },
      { title: "Portfolio Ownership Tracking", description: "Entity resolution across LLCs and trusts. Know when the same owner controls multiple parcels. Track changes over time." },
    ],
  },
  "manufacturing": {
    challenges: [
      "Your customer database is a mess: duplicates, outdated contacts, the same company under five different names. Cleaning it manually would take months.",
      "Your CRM scores leads, but your reps ignore it because the scores don't match reality. The best opportunities get buried.",
      "Decades of product specs, procedures, and tribal knowledge exist somewhere: binders, shared drives, retired engineers' heads. Nobody can find anything.",
      "Salesforce knows the customer. Your ERP knows the orders. Production knows what shipped. None of them talk to each other.",
      "Your cost structures and pricing models are competitive advantage, but every AI vendor wants them in the cloud.",
      "'How many truckloads shipped this week?' still requires three phone calls to answer.",
    ],
    solutions: [
      { title: "AI Agents for Data Cleanup", description: "Autonomous agents that reason through your messy data like humans do, but at machine scale. Duplicates resolved, records standardized, conflicts fixed. What would take 50 people months, done in hours at 125x less cost." },
      { title: "Lead Scoring That Challenges Assumptions", description: "We train on your actual conversion data and often find the opposite of what CRMs assume. One client discovered property value was a <em>negative</em> predictor. 31% higher success rates when you score on what actually works." },
      { title: "Document Intelligence", description: "Turn decades of specs, procedures, and institutional knowledge into a searchable AI knowledge base. Your team asks questions in plain English, gets instant answers with sources. New documents automatically expand what AI knows." },
      { title: "AI That Runs Inside Your Firewall", description: "Your pricing models, cost structures, and customer data never leave your servers. Full AI capabilities with zero cloud exposure. Your compliance team will actually approve this." },
      { title: "Systems That Finally Talk", description: "Your CRM knows the customer. Your ERP knows the orders. Production knows what shipped. We connect them into one unified view. Sales sees the full picture without leaving Salesforce." },
      { title: "Natural Language Operations", description: "<em>How many truckloads shipped this month? Which orders are at risk? What's our margin on this product line?</em> Ask in plain English, get answers in seconds. No reports to request, no spreadsheets to build." },
    ],
    benefits: [
      { title: "125x Cheaper Data Cleanup", description: "AI agents fix duplicates, standardize records, and resolve conflicts at a fraction of manual review cost. Your data finally works." },
      { title: "Sales Scores That Actually Work", description: "Trained on real conversions, not assumptions. Your reps trust it because it matches what they see in the field." },
      { title: "Knowledge That's Finally Findable", description: "Specs, procedures, and expertise searchable by everyone. New hires productive in weeks, not months." },
      { title: "Trade Secrets Stay Secret", description: "AI runs on your infrastructure. Pricing, costs, and methods never touch external servers." },
      { title: "One View of Everything", description: "Customer history, orders, shipments, production status, quality issues. All visible without switching systems or making calls." },
      { title: "Answers in Seconds", description: "Operations questions answered instantly. No waiting for someone to pull a report or return a call." },
    ],
    useCases: [
      { title: "Customer Data Cleanup", description: "1.69M records with broken IDs, duplicates, and conflicts. AI agents processed them in parallel, identified 1.25M unique entities, documented every decision. What would take 50 analysts months, done in hours." },
      { title: "Lead Scoring That Works", description: "Analyzed 3 years of conversion data. Discovered urgency and financial capacity predict success, not property value. 31% higher conversion rates vs. standard CRM scoring." },
      { title: "Searchable Product Knowledge", description: "Thousands of spec sheets from 70+ suppliers turned into an AI knowledge base. Reps ask 'What's the torque rating on the X200?' and get instant answers with source documents." },
      { title: "Complete Customer View", description: "Rep opens Salesforce, sees order history, shipment status, quality issues, payment patterns, reorder predictions. No asking anyone or switching systems." },
      { title: "Daily Operations Intelligence", description: "'Are we behind on the Johnson order?' 'What shipped yesterday?' 'Which orders are at risk this week?' One dashboard, real-time data, no phone calls needed." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
