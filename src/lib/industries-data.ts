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
    description: "Get paid what you're worth, stop drowning in paperwork, and use AI without putting patient data at risk.",
    icon: "heart",
    lottie: "/animations/healthcare-industry.json",
    ctaText: "Access Price Transparency Data",
    ctaHref: "/assessments/healthcare-benchmark",
    ctaSubtext: "See what competitors get paid in your market",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Find off-market deals others miss. We clean the messy public data, track ownership through the LLCs, and help you run outreach that actually converts.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
    ctaText: "See a Sample Property Report",
    ctaHref: "/contact?service=cre-demo",
    ctaSubtext: "See what enriched ownership data looks like",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Know which leads to call first, which customers are about to reorder, and whether you're on track to ship—without three phone calls to find out.",
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
      "Your staff spends more time on paperwork than patients",
      "You're underpaid on some payer contracts—you just can't prove it",
      "AI tools want your data in the cloud, and that's not happening",
      "Your EHR is 15 years old and nothing talks to each other",
      "Answers are buried in systems, documents, and people's heads",
    ],
    solutions: [
      { title: "AI That Stays In-House", description: "Everything runs on your servers. Patient data never leaves. Your compliance officer will actually approve this one." },
      { title: "Know What Competitors Get Paid", description: "We process the price transparency files no one can read. See what others get paid for the same procedures. Real leverage for payer negotiations." },
      { title: "Modern Data Layer, Legacy Systems Intact", description: "You don't need to rip and replace your EHR. We build a modern data layer on top of what you have, connecting systems that were never designed to work together." },
      { title: "Document Intelligence", description: "AI reads insurance cards, referrals, and clinical documents. Extracts what matters, routes it where it belongs. No more manual data entry from paper." },
      { title: "Research Without the Reading", description: "AI agents scan clinical literature, synthesize findings, and surface relevant protocols. Hours of research condensed into minutes." },
      { title: "Ask Questions, Get Answers", description: "Your admin team asks in plain English: 'Which payer is slowest?' 'How did October compare to September?' Answers in seconds. No report requests." },
      { title: "Find Anything Instantly", description: "Policies, protocols, procedures searchable like Google. Staff ask, AI answers with sources. Faster onboarding. Fewer mistakes." },
    ],
    benefits: [
      { title: "Revenue You're Owed", description: "See where you're underpaid. Walk into payer negotiations with data, not guesses." },
      { title: "Staff That Can Breathe", description: "Less time on paperwork means more time with patients and less burnout." },
      { title: "AI Without the Risk", description: "PHI stays on your servers. Compliance stays simple. No third-party exposure." },
      { title: "Systems That Finally Connect", description: "Your EHR, billing, and scheduling talking to each other without a rip-and-replace." },
      { title: "Research in Minutes", description: "Clinical literature reviewed and synthesized. AI delivers summaries with citations, not reading lists." },
      { title: "Knowledge That Stays", description: "Policies, protocols, and institutional knowledge searchable by everyone, forever." },
    ],
    useCases: [
      { title: "Win Payer Negotiations", description: "Know what competitors get paid before you sit down. Data-backed leverage that changes the conversation." },
      { title: "Prior Auth in Minutes", description: "AI gathers documentation, checks requirements, drafts the submission. Your staff reviews and sends." },
      { title: "Intake Without Data Entry", description: "Patients complete forms. AI extracts, validates, and routes. No one re-types into the EHR." },
      { title: "EHR Integration Without Migration", description: "Connect Epic, Cerner, or that legacy system nobody wants to touch. Pull data into a unified layer for AI and analytics without disrupting clinical workflows." },
      { title: "Clinical Literature Review", description: "Need the latest on a treatment protocol? AI scans the literature and delivers a summary with citations. Research in minutes." },
      { title: "Onboarding That Works", description: "New hires search every policy and protocol from day one. Instant answers, linked sources." },
    ],
  },
  "legal": {
    challenges: [
      "Associates spending 60% of their time on work that doesn't require a law degree",
      "Knowledge walking out the door every time a partner retires",
      "Losing pitches to firms that seem to know more about prospects than you do",
      "15+ software systems that don't talk to each other",
      "Client data in the cloud means ethics headaches you don't need",
    ],
    solutions: [
      { title: "Knowledge That Stays", description: "Every precedent, every clause, every brief searchable forever. When partners retire, their expertise doesn't leave with them." },
      { title: "AI That Stays In-House", description: "Client files never leave your servers. No OpenAI, no third-party clouds. Privilege stays intact." },
      { title: "Document Intelligence", description: "AI reads contracts, extracts terms, flags issues. Due diligence that took 200 hours now takes 20." },
      { title: "Research in Minutes", description: "AI agents search case law, synthesize holdings, and draft memos with citations. Days of research, delivered in an hour." },
      { title: "First Drafts, Fast", description: "AI handles the boilerplate. Associates handle the judgment. Same quality work, half the billable hours burned." },
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
      "You're paying brokers for deal flow everyone else sees too",
      "Public property data exists but it's a mess no one can actually use",
      "The real owner is hiding behind three LLCs and a Delaware trust",
      "Your outreach is generic because you can't personalize at scale",
      "Too many potential targets, no way to know which ones to call first",
      "Your deal pipeline is competitive advantage, but every AI tool wants it in the cloud",
    ],
    solutions: [
      { title: "AI That Protects Your Edge", description: "Your deal pipeline is competitive advantage. Our AI runs on your servers. Pricing models, target lists, and acquisition strategies stay inside your walls." },
      { title: "Property Research at Scale", description: "Pull from tax records, ownership data, transaction history. We clean it, connect it, and make it searchable." },
      { title: "Ownership Intelligence", description: "Track who actually owns what across LLCs, trusts, and holding companies. See ownership changes over time. Know who to call." },
      { title: "Lease Abstraction at Scale", description: "AI reads every lease in the data room. Extracts terms, renewal dates, rent escalations, and gotchas. What took a paralegal a week takes an hour." },
      { title: "Market Research on Autopilot", description: "AI agents gather comps, track transactions, and monitor market activity. Research that runs in the background, ready when you need it." },
      { title: "Owner Motivation Scoring", description: "Hold period analysis, tax burden tracking, loan maturity dates. AI scores every property by likelihood to trade. Stop guessing, start timing." },
      { title: "Tailored Outreach Campaigns", description: "Mass-mail with precision. Enrich each record with property-specific details for offers that feel personal, not generic." },
      { title: "Lead Scoring", description: "When you can see the whole market, you have too many leads. Scoring tells you which opportunities to pursue first." },
    ],
    benefits: [
      { title: "Deal Flow You Control", description: "Stop waiting for brokers. Source your own off-market opportunities at scale." },
      { title: "Deals Stay Confidential", description: "Your pipeline and pricing models never touch third-party servers. Competitive intelligence stays competitive." },
      { title: "Data You Can Trust", description: "Messy public records cleaned, connected, and actually usable. No more garbage data." },
      { title: "Know Who to Call", description: "Ownership traced through LLCs and trusts. The real decision-maker, not a dead end." },
      { title: "Due Diligence in Hours", description: "Leases abstracted, financials extracted, red flags surfaced. Data rooms processed while you sleep." },
      { title: "Best Leads First", description: "Scoring tells you where to focus. Work smart, not just hard." },
    ],
    useCases: [
      { title: "Off-Market Deal Sourcing", description: "Find owners before they list. See who's held properties for 10+ years, who's paying high taxes, who might be motivated." },
      { title: "Direct-to-Owner Campaigns", description: "Personalized mailers at scale. Each offer reflects the specific property, owner history, and market context." },
      { title: "Ownership Tracking", description: "Entity resolution across LLCs and trusts. Know when the same owner controls multiple parcels. Track changes over time." },
      { title: "Data Room Processing", description: "AI extracts from rent rolls, leases, and financials. Surfaces issues before you're too deep in the deal." },
      { title: "Market Intelligence", description: "AI agents monitor transactions, track asking rents, and flag market shifts. Always current, always ready." },
      { title: "Lead Prioritization", description: "Score every opportunity by likelihood to convert. Work the best leads first, not just the newest." },
    ],
  },
  "manufacturing": {
    challenges: [
      "'How many truckloads shipped this week?' shouldn't require three phone calls to answer",
      "Salesforce has years of customer data, but it can't tell you what shipped, what's in production, or which accounts had quality issues",
      "You've got 200 leads from the trade show and no idea which 20 are actually worth calling",
      "Your best sales rep works on instinct. Great for him, impossible to scale.",
      "Customers reorder when they reorder. You find out after, not before.",
      "Your cost structures are competitive advantage, but every AI tool wants them in the cloud",
    ],
    solutions: [
      { title: "AI That Protects Your IP", description: "Your cost structures are competitive advantage. Our AI runs inside your firewall. Pricing models, customer data, production methods stay yours." },
      { title: "Systems That Finally Talk", description: "Your CRM knows the customer. Your ERP knows the orders. Production knows what shipped. We connect them into one unified view. Sales sees the full picture without leaving Salesforce. No more spreadsheet chaos or phone calls." },
      { title: "Lead Scoring", description: "AI ranks every lead by likelihood to close. Your sales team works the hottest opportunities first, not just the newest ones in the inbox." },
      { title: "Customer Intelligence", description: "See which customers are growing, which are slowing down, and which are about to reorder. Patterns you'd never spot manually, surfaced through intelligent analysis." },
      { title: "Documents Without Data Entry", description: "AI reads POs, extracts line items, updates your ERP. Spec sheets become searchable. Quality reports flag issues automatically." },
      { title: "Talk to Your Data", description: "<em>How many truckloads shipped this month? What's our average cost per unit over time?</em> Ask in plain English, get answers in seconds." },
    ],
    benefits: [
      { title: "Trade Secrets Stay Secret", description: "Your pricing, costs, and methods never leave your servers. AI capabilities without the exposure." },
      { title: "Sales That Scales", description: "Your reps focus on the leads most likely to close. AI does the prioritizing so they can do the selling." },
      { title: "Customers Before They Call", description: "Know when customers are ready to reorder, at risk of leaving, or growing fast. Act first, not last." },
      { title: "Paperwork Processed", description: "POs, specs, and quality reports read automatically. Data flows to the right systems without anyone retyping." },
      { title: "One View of Everything", description: "Orders, shipments, production status, customer history all visible from Salesforce. No tab-switching, no phone calls." },
      { title: "Answers Without Chasing", description: "'How many truckloads?' 'Are we on track?' Answered instantly. Not three calls and a spreadsheet." },
    ],
    useCases: [
      { title: "Trade Show Lead Scoring", description: "200 badge scans become a ranked list. Your reps call the best 20 first, not whichever ones are on top of the pile." },
      { title: "Customer Reorder Prediction", description: "AI spots the patterns: this customer reorders every 6 weeks, this one's slowing down. Your team reaches out at the right time." },
      { title: "PO Processing", description: "Customer sends a PO. AI extracts line items, quantities, and dates. ERP updated before anyone opens a spreadsheet." },
      { title: "Complete Customer View", description: "Rep opens Salesforce, sees last order, shipment status, any quality issues, payment history all without asking anyone." },
      { title: "Daily Production Status", description: "'Are we behind?' 'What shipped?' 'Any orders at risk?' One dashboard, updated continuously, no phone calls needed." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
