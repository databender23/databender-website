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
    description: "Ask questions in plain English, get instant answers from your own documents. AI that finally understands your clinical knowledge—without your data ever leaving the building.",
    icon: "heart",
    lottie: "/animations/healthcare-industry.json",
    ctaText: "See Document Intelligence",
    ctaHref: "/case-studies/agentic-document-intelligence",
    ctaSubtext: "How AI turns documents into searchable knowledge",
  },
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Stop sending mailers to the wrong people. We cleaned 1.69M broken ownership records at 125x less cost than doing it by hand. Know exactly who to call and review data rooms overnight instead of over weeks.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
    ctaText: "See the Case Study",
    ctaHref: "/case-studies/army-of-ai-agents",
    ctaSubtext: "How we fixed 1.69M broken ownership records",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Clean up messy customer data in hours instead of months. Score leads based on who actually buys. Find any product spec in seconds. AI that delivers real results—and stays inside your building.",
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
      "Most AI tools want your patient data in their cloud—that's not an option",
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
      { title: "Instant Answers", description: "Ask a question in plain English, get the answer with a link to the source. No more digging through folders." },
      { title: "Knowledge That Stays", description: "When experienced staff retire, what they knew stays searchable. New hires tap into decades of expertise from day one." },
      { title: "More Time for Patients", description: "Less hunting for information means more time for the work that matters." },
      { title: "Your Data Stays Private", description: "AI runs on your computers. Patient information never leaves your building." },
      { title: "Systems That Connect", description: "Information flows between your EHR, billing, and scheduling without manual workarounds." },
      { title: "Smarter Over Time", description: "Every document you add expands what AI can answer. Your knowledge base grows automatically." },
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
      "Associates spending 60% of their time on work that doesn't require a law degree",
      "Knowledge walking out the door every time a partner retires, and no way to get it back",
      "BD strategies based on gut feelings, not data on what actually wins pitches",
      "15+ software systems that don't talk to each other",
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
      "You're sending four mailers to the same person while missing the actual property owners entirely.",
      "Competitors are reaching the real decision-maker before you even figure out who that is.",
      "The owner is hidden behind three LLCs and a Delaware trust. Good luck finding a phone number.",
      "Data rooms take weeks to review. You find the red flags after you're already committed.",
      "You have 10,000 potential targets and no way to know which 100 are worth calling first.",
    ],
    solutions: [
      { title: "Stop Mailing the Wrong People", description: "We cleaned 1.69 million ownership records for a client—same person listed ten different ways, different people sharing the same ID. Sorted it out in hours at 125x less cost than doing it by hand. Now every mailer goes to the right person." },
      { title: "Find the Real Owner", description: "The property is owned by an LLC, which is owned by a trust, which is managed by another LLC. We trace through the layers to find the actual decision-maker. Know who to call before your competitors figure it out." },
      { title: "Review Data Rooms Overnight", description: "AI reads every lease, rent roll, and financial document. Pulls out key terms, renewal dates, and potential problems. What used to take a week now takes an hour. You get a summary in the morning." },
      { title: "Know Which Deals to Chase", description: "Not all opportunities are equal. We score properties based on what actually predicts a sale: how long they've held it, tax situation, loan timing. When you have 10,000 targets, we tell you which 100 to call first." },
      { title: "Personalized Outreach That Scales", description: "Each letter reflects the specific property, the owner's situation, and local market conditions. Mass outreach that doesn't look or feel like mass outreach. Response rates go up because it's relevant." },
      { title: "Market Research on Autopilot", description: "Comps, recent transactions, market activity—automatically gathered and updated in the background. The research is ready when you need it, without you having to do it." },
    ],
    benefits: [
      { title: "125x Cost Savings", description: "What would take a team of 50 people months to do manually, we do in hours for a fraction of the cost." },
      { title: "First to the Owner", description: "While competitors are still untangling LLCs, you're already on the phone with the decision-maker." },
      { title: "No More Dead Ends", description: "Stop chasing wrong numbers and outdated contacts. Every person in your list is verified and reachable." },
      { title: "Faster Due Diligence", description: "Review a data room overnight. Know the red flags before you commit, not after." },
      { title: "Better Deal Selection", description: "Focus on properties most likely to trade, based on real patterns, not gut feeling." },
      { title: "Your Data Stays Yours", description: "Your pipeline and deal models stay on your own servers. No sensitive data going to third parties." },
    ],
    useCases: [
      { title: "Fixing Broken Ownership Records", description: "A client had 1.69M property records—same owner under different names, different owners sharing the same ID. We untangled it all and identified 1.25M unique owners. Now they know exactly who owns what before they reach out." },
      { title: "Overnight Data Room Review", description: "AI reads every document: rent rolls, leases, financials. Extracts the important terms and flags potential issues. You get a summary in the morning instead of next month." },
      { title: "Finding Off-Market Opportunities", description: "Identify owners who've held properties 10+ years, have high tax burdens, or show signs of being motivated to sell. Reach them before they list with a broker." },
      { title: "Smarter Direct Mail", description: "Each mailer is tailored to the property and owner's situation. Response rates go up because it's relevant, not generic spam." },
      { title: "Prioritizing Your Pipeline", description: "Score every opportunity by likelihood to close. Work the best leads first instead of going down the list randomly." },
      { title: "Tracking Multi-Property Owners", description: "See when the same person or entity owns multiple properties. Spot patterns that reveal motivated sellers or consolidation opportunities." },
    ],
  },
  "manufacturing": {
    challenges: [
      "You're sending quotes to the wrong contacts because the same customer is in your system five different ways.",
      "Your sales team ignores the CRM lead scores because they don't match who actually buys.",
      "Someone asks about a product spec and three people spend an hour hunting through old folders and emails.",
      "Sales doesn't know what shipped. Production doesn't know what's promised. Everyone's calling around to find out.",
      "You'd use AI, but your pricing and costs are competitive advantage—you can't put that in the cloud.",
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
      { title: "Stop Wasting Time on Bad Data", description: "AI cleans up duplicates and fixes records 125x cheaper than doing it manually. Your team works with data they can trust." },
      { title: "Chase the Right Leads", description: "Scores based on what actually predicts a sale, not what sounds good. Your reps trust it because it matches what they see." },
      { title: "Anyone Can Find Anything", description: "Product specs, procedures, supplier info—all searchable by anyone. New hires are useful in weeks, not months." },
      { title: "Keep Your Secrets Secret", description: "AI runs on your equipment. Nothing sensitive ever leaves your building." },
      { title: "See Everything in One Place", description: "Customer history, orders, shipments, quality issues—visible without switching systems or making calls." },
      { title: "Get Answers Immediately", description: "No waiting for someone to pull a report or call you back. Ask the question, get the answer." },
    ],
    useCases: [
      { title: "Customer Database Cleanup", description: "A client had 1.69M records that were a mess—duplicates everywhere, same person under different names. AI agents sorted through it all and identified 1.25M actual unique customers. Done in hours, not the months it would have taken by hand." },
      { title: "Better Lead Scoring", description: "We looked at 3 years of actual sales data. Turns out urgency and ability to pay matter most—not property value, which was actually a bad sign. Result: 31% more deals closed." },
      { title: "Instant Product Knowledge", description: "Thousands of spec sheets turned into a system anyone can search. Ask 'What's the weight capacity?' and get the answer with the source document. No hunting through folders." },
      { title: "Full Customer Picture", description: "Open Salesforce and see everything: order history, what shipped, any quality issues, payment history, when they'll likely reorder. No phone calls needed." },
      { title: "Real-Time Operations", description: "Are we behind on the Johnson order? What shipped yesterday? Which orders are at risk? One place to look, always current, no chasing people down." },
    ],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
