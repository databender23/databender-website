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
    description: "Your clinical staff spends hours hunting for information that should take seconds. We turn your documents into a searchable knowledge base. Protocol lookups go from 15 minutes to 30 seconds, and nothing leaves your building.",
    icon: "heart",
    lottie: "/animations/healthcare-industry.json",
    ctaText: "See What This Looks Like",
    ctaHref: "/industries/healthcare",
    ctaSubtext: "From 15 minutes to 30 seconds",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Find the real owner behind the LLCs. Get portfolio-wide visibility even when every property uses different software. Due diligence in hours, not weeks.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
    ctaText: "See the Case Study",
    ctaHref: "/case-studies/army-of-ai-agents",
    ctaSubtext: "How we fixed 1.69M broken ownership records",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Stop hunting for answers across spreadsheets and phone calls. See orders, production, and shipments in one place. AI that runs on your equipment, so your competitive data stays private.",
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
      "Answers buried in thousands of documents nobody has time to search",
      "Staff spending more time hunting for information than helping patients",
      "When experienced people leave, their knowledge walks out with them",
      "Systems that don't talk to each other, requiring manual workarounds",
      "Most AI tools want your patient data in their cloud. That's not an option.",
    ],
    solutions: [
      { title: "Document Intelligence", description: "AI reads your documents and answers questions in plain English. No more digging through folders or calling someone who might know." },
      { title: "Knowledge That Stays", description: "Capture what your experienced staff know. Make it searchable. When they retire, the knowledge stays with you." },
      { title: "Research Summaries", description: "Need the latest on a treatment? AI reviews the literature and gives you a summary with sources. Research in minutes, not hours." },
      { title: "Private by Design", description: "Everything runs on your computers. Patient information never leaves your building. Compliance approved." },
      { title: "Plain English Q&A", description: "Your team asks questions like they would ask a colleague. AI searches your documents and returns answers with links to sources." },
      { title: "Connect Your Systems", description: "We connect Epic, Cerner, or whatever you have. Information flows where it needs to without replacing anything." },
    ],
    benefits: [
      { title: "30 Seconds vs. 15 Minutes", description: "Protocol lookups that used to take a quarter hour now take half a minute. Your team gets answers, not hunting expeditions." },
      { title: "New Hires Productive in Weeks", description: "They tap into decades of experience from day one. No more waiting months for them to learn who knows what." },
      { title: "5+ Hours Back Per Week", description: "Less hunting for information, more time for the work that matters. Per person. Do the math across your team." },
      { title: "Zero Data Leaves Your Building", description: "AI runs on your computers. Patient information stays put. Your compliance team will actually approve this." },
      { title: "One Place for Everything", description: "No more toggling between screens or calling around. Information flows where it needs to without replacing what you have." },
      { title: "Every Document Makes It Better", description: "Your knowledge base grows automatically. Add a new protocol, it's searchable immediately." },
    ],
    useCases: [
      { title: "\"What's our protocol for...?\"", description: "Staff ask questions in plain English. AI searches your documents and returns answers with sources." },
      { title: "New Hire Onboarding", description: "New team members can search every policy from day one. No more asking around or waiting for someone to show them." },
      { title: "Payer Requirements", description: "\"What does this payer require?\" AI checks the latest requirements and tells you what's needed." },
      { title: "Research Summaries", description: "Need the latest on a treatment? AI reviews the literature and gives you a summary with citations." },
      { title: "Prior Auth Support", description: "AI helps gather required documentation and checks payer requirements. Staff review and send." },
      { title: "Finding Information Fast", description: "\"What's our formulary policy?\" \"Who handles appeals at this payer?\" Instant answers from your own documents." },
    ],
  },
  "legal": {
    challenges: [
      "Associates spending hours researching things the firm already figured out years ago",
      "Knowledge walking out the door every time a partner retires, with no way to get it back",
      "Decades of briefs, memos, and contracts sitting in folders nobody searches",
      "Custom software that could solve your problems exists, but every quote comes back at $150K+ with a six-month timeline",
      "Every AI tool wants your client data in the cloud. That's an ethics problem.",
    ],
    solutions: [
      { title: "AI Document Assistants", description: "AI that reviews contracts, researches case law, and drafts memos overnight. You review in the morning. Same quality, fraction of the time." },
      { title: "Searchable Firm Knowledge", description: "Search your firm's documents like Google. Ask questions in plain English, get answers with sources. Every new document makes the system smarter." },
      { title: "Private AI", description: "Client files never leave your servers. No data goes to OpenAI or any third party. Your ethics committee will actually approve this." },
      { title: "Win Pattern Analysis", description: "We look at which pitches you won and lost. We find what actually made the difference. 31% better conversion when you know what works." },
      { title: "Research in Minutes", description: "AI searches case law, pulls relevant precedents, and drafts memos with citations. Days of work, delivered in an hour." },
      { title: "Client Intelligence", description: "See every touchpoint across every partner. Spot opportunities before competitors do." },
    ],
    benefits: [
      { title: "Associates Bill More", description: "Less time on research and first drafts. More time on work that clients value and pay for." },
      { title: "Knowledge Stays in the Firm", description: "When partners retire, their expertise stays. Every matter makes the next one easier." },
      { title: "Privacy Without Compromise", description: "Full AI capabilities. No client data leaves your building. Ethics committee approved." },
      { title: "Pitches That Win", description: "Walk in knowing more about the prospect than they expect. See the relationship history at a glance." },
      { title: "Faster Closes", description: "AI reviews the data room overnight. You focus on the issues that matter. Happier clients." },
      { title: "Less Partner Anxiety", description: "Knowledge doesn't walk out the door. Client relationships aren't trapped in one person's inbox." },
    ],
    useCases: [
      { title: "Due Diligence in Days", description: "AI reads the data room. Flags issues. Drafts the memo. What took 200 associate hours now takes 20." },
      { title: "Contract Review at Scale", description: "500 contracts to review? AI extracts key terms, compares across documents, flags the outliers." },
      { title: "Find Past Work Instantly", description: "'Every contract with this clause.' 'All our work for this client.' AI searches 10 years of matters in minutes." },
      { title: "Capture Retiring Partner Knowledge", description: "30 years of expertise, searchable. New associates learn from the best, even after they're gone." },
      { title: "Pitch Prep Made Easy", description: "AI pulls relationship history, past matters, industry context. Walk in prepared without the homework." },
      { title: "First Drafts Overnight", description: "AI generates briefs with case citations. Associates refine and finalize. Same quality, faster turnaround." },
    ],
  },
  "commercial-real-estate": {
    challenges: [
      "You're sending mailers to the wrong people while missing actual owners entirely.",
      "Competitors reach the decision-maker before you figure out who that is.",
      "Data rooms take weeks to review. You find problems after you're committed.",
      "Every property uses different software. Getting a portfolio-wide view takes days.",
      "Quarterly investor reports eat two weeks. And you're never confident they're right.",
    ],
    solutions: [
      { title: "Find the Real Owner", description: "The property is owned by an LLC, which is owned by a trust, which is managed by another LLC. We trace through the layers to the actual decision-maker. Know who to call before your competitors figure it out." },
      { title: "Due Diligence Overnight", description: "AI reads every lease, rent roll, and financial document. Pulls out key terms, renewal dates, and red flags. What took a week now takes hours. You get a summary in the morning." },
      { title: "Know Which Deals to Chase", description: "You have 10,000 targets. We score them based on what actually predicts a sale: hold period, tax situation, loan timing. We tell you which 100 to call first." },
      { title: "One View, All Properties", description: "Yardi here, AppFolio there, MRI somewhere else. We connect them. See occupancy, NOI, and lease expirations across everything in one place." },
      { title: "Investor Reports in Hours", description: "Stop the quarterly scramble. We automate the data pull and consolidation. You review a polished report instead of building it from scratch." },
      { title: "Catch Renewals Early", description: "Know about lease expirations 6 months out, not 30 days. See which leases are below market. Stop leaving money on the table." },
    ],
    benefits: [
      { title: "First to the Owner", description: "While competitors untangle LLCs, you're already on the phone with the decision-maker." },
      { title: "Faster Due Diligence", description: "Review a data room overnight. Know the red flags before you commit, not after." },
      { title: "Better Deal Selection", description: "Focus on properties most likely to trade. Real patterns, not gut feeling." },
      { title: "Portfolio Visibility", description: "See all properties in one place, regardless of what software they use." },
      { title: "Reports That Don't Take Forever", description: "Quarterly investor reports in a day, not two weeks." },
      { title: "Your Data Stays Yours", description: "Your pipeline, your portfolio data, your servers. Nothing goes to third parties." },
    ],
    useCases: [
      { title: "Fixing Broken Ownership Records", description: "1.69M property records. Same owner under ten different names. Different owners sharing the same ID. We sorted it all and identified 1.25M unique owners. Hours, not months." },
      { title: "Overnight Data Room Review", description: "AI reads every document: rent rolls, leases, financials. Extracts what matters and flags problems. Summary in the morning, not next month." },
      { title: "Finding Off-Market Deals", description: "Owners who've held 10+ years. High tax burdens. Signs of motivation. Reach them before they list with a broker." },
      { title: "Portfolio Dashboard", description: "20 properties on 3 different systems. One view of occupancy, NOI, collections. No more logging into four places to answer one question." },
      { title: "Faster Investor Reporting", description: "Data pulls automatically. Report generation in clicks. What took two weeks now takes a day." },
      { title: "Lease Renewal Pipeline", description: "Expirations 6-9 months out. Below-market rates flagged. Priority ranking by revenue impact. Nothing slips through." },
    ],
  },
  "manufacturing": {
    challenges: [
      "Customer calls about their order. Three people spend 30 minutes hunting through systems to give them an answer.",
      "Production makes decisions based on yesterday's numbers. By the time you see a problem, it's already a fire.",
      "Sales promised Friday. Production found out Monday. Now everyone's scrambling to make it happen.",
      "The answer exists somewhere in your systems. Finding it takes longer than just calling someone who might know.",
      "You'd use AI, but your pricing, costs, and customer lists are competitive advantage. Cloud tools aren't an option.",
    ],
    solutions: [
      { title: "Fix Your Customer Data", description: "We cleaned 1.69 million messy records for another client—same person under different names, same ID on different people. AI sorted it out in hours instead of months, at 125x less cost than doing it by hand. Your team stops chasing dead ends." },
      { title: "Lead Scores That Match Reality", description: "Most CRM scoring is based on guesses. We trained on a client's actual sales data and found property value was a <em>negative</em> predictor—the opposite of what everyone assumed. Real data, real results: 31% more wins." },
      { title: "Find Any Answer in Seconds", description: "We turned thousands of product specs from 70+ suppliers into a searchable system. Now anyone can ask 'What's the torque rating on the X200?' and get an instant answer with the source document. No hunting." },
      { title: "AI That Stays In Your Building", description: "Your pricing, costs, and customer data never leave your servers. Full AI capabilities without the cloud risk. Your IT and legal teams will actually say yes to this." },
      { title: "Connect Your Systems", description: "Sales sees orders. Production sees what shipped. Finance sees payments. We connect them so everyone sees the full picture—without replacing what you already have." },
      { title: "Ask Questions, Get Answers", description: "How many truckloads shipped this week? Which orders are at risk? What's our margin on this line? Just ask. No reports to request, no spreadsheets to build, no calls to make." },
    ],
    benefits: [
      { title: "Orders On Time", description: "See at-risk orders before they're late. Less scrambling, more delivering on what you promised." },
      { title: "Less Firefighting", description: "Problems show up before they become emergencies. Your team reacts less and runs operations more." },
      { title: "Answers in Seconds", description: "Customer calls, you know. Spec question, you find it. No hunting through systems or calling around." },
      { title: "New Hires Productive Fast", description: "They search the same system everyone else uses. Weeks to useful, not months." },
      { title: "Decisions on Current Data", description: "Not yesterday's spreadsheet. What's actually happening right now." },
      { title: "Your Data Stays Yours", description: "Everything runs on your systems. Competitive information never leaves your building." },
    ],
    useCases: [
      { title: "\"Where's the Johnson order?\"", description: "Customer calls. You answer in 30 seconds, not 30 minutes. Order status, shipping, quality history, one place." },
      { title: "Morning Production Meeting", description: "Current numbers, not last night's export. Everyone sees the same data. Decisions based on what's actually happening." },
      { title: "Lead Scores That Match Reality", description: "We analyzed 3 years of sales data. Found what actually predicts a close. 31% more wins when reps focus on the right leads." },
      { title: "New Rep Finds Their Own Answers", description: "They search the system instead of interrupting the veteran. Specs, procedures, customer history, all searchable." },
      { title: "Customer History Without Switching Systems", description: "One screen. Orders, shipments, quality issues, payment history. Know the full story before you pick up the phone." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
