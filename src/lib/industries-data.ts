import type { Industry } from "@/types";

export interface IndustryWithCta extends Industry {
  ctaText?: string;
  ctaHref?: string;
  ctaSubtext?: string;
}

export const industries: IndustryWithCta[] = [
  // Ordered by average fit score from research (ChatGPT + Claude)
  // 1. Healthcare: 9.25 avg (ChatGPT 9/10, Claude 9.5/10)
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
  // 2. Construction: 8.0 (ChatGPT 8/10, Claude not scored)
  {
    slug: "construction",
    title: "Construction",
    description: "Your project data lives in eleven different places. You find out about margin problems at closeout. Change orders approved in the field never make it to billing. We fix that.",
    icon: "hardhat",
    lottie: "/animations/construction-industry.json",
    ctaText: "Take the Readiness Assessment",
    ctaHref: "/assessments/construction",
    ctaSubtext: "5 minutes to see where you stand",
  },
  // 3. Manufacturing: 7.75 avg (ChatGPT 9/10, Claude 6.5/10)
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Do more with the team you have. Stop hunting for answers across spreadsheets and phone calls. See orders, production, and shipments in one place. AI that runs on your equipment, so your competitive data stays private.",
    icon: "factory",
    lottie: "/animations/manufacturing-industry.json",
    ctaText: "Take the Readiness Assessment",
    ctaHref: "/assessments/manufacturing",
    ctaSubtext: "5-minute assessment for growing manufacturers",
  },
  // 4. Wholesale Distribution: 6.75 avg (ChatGPT 8/10, Claude 5.5/10)
  {
    slug: "wholesale-distribution",
    title: "Wholesale Distribution",
    description: "Inventory ties up cash. Pricing lives in spreadsheets. Customer profitability is invisible until year-end. We connect your ERP, WMS, and sales data to show you what moves, who makes you money, and where margin leaks.",
    icon: "truck",
    lottie: "/animations/wholesale-distribution.json",
    ctaText: "Take the Readiness Assessment",
    ctaHref: "/assessments/distribution",
    ctaSubtext: "10-minute assessment for mid-sized distributors",
  },
  // 5. Commercial Real Estate: 5.0 avg (ChatGPT 6/10, Claude 4/10)
  {
    slug: "commercial-real-estate",
    title: "Commercial Real Estate",
    description: "Data problems in CRE are what we do. Find the real owner behind the LLCs (95%+ accuracy). Get portfolio-wide visibility even when every property uses different software. Due diligence in hours, not weeks.",
    icon: "building",
    lottie: "/animations/commercial-real-estate.json",
    ctaText: "Take the Assessment",
    ctaHref: "/assessments/commercial-real-estate",
    ctaSubtext: "For brokers, investors, and property managers",
  },
  // 6. Legal: 4.75 avg (ChatGPT 5/10, Claude 4.5/10)
  {
    slug: "legal",
    title: "Legal",
    description: "Knowledge management, client intelligence, and business development tools for law firms that want results, not more software.",
    icon: "scale",
    ctaText: "Download Free Guides",
    ctaHref: "/industries/legal#guides",
    ctaSubtext: "Practical resources for forward-thinking firms",
  },
];

export const industryContent: Record<string, {
  challenges: string[];
  solutions: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
  caseStudySlugs?: string[];
}> = {
  "healthcare": {
    challenges: [
      "Prior auth eats 13 hours per physician per week. 93% say it delays patient care.",
      "Claim denials up across the board. 82% of health systems report higher denial rates than pre-pandemic.",
      "Answers buried in thousands of documents nobody has time to search",
      "Staff spending more time hunting for information than helping patients",
      "When experienced people leave, their knowledge walks out with them",
      "Most AI tools want your patient data in their cloud. That's not an option.",
    ],
    solutions: [
      { title: "Document Intelligence", description: "AI reads your documents and answers questions in plain English. No more digging through folders or calling someone who might know." },
      { title: "Knowledge That Stays", description: "Capture what your experienced staff know. Make it searchable. When they retire, the knowledge stays with you." },
      { title: "Research Summaries", description: "Need the latest on a treatment? AI reviews the literature and gives you a summary with sources. Research in minutes, not hours." },
      { title: "Private by Design", description: "In 2024, 42% of healthcare breaches came from third-party vendors. Everything runs on your servers. Patient information never leaves your building." },
      { title: "Plain English Q&A", description: "Your team asks questions like they would ask a colleague. AI searches your documents and returns answers with links to sources." },
      { title: "Connect Your Systems", description: "We connect Epic, Cerner, athenahealth, eClinicalWorks, and 40+ other systems. Information flows where it needs to without replacing anything." },
    ],
    benefits: [
      { title: "30 Seconds vs. 15 Minutes", description: "Protocol lookups that used to take a quarter hour now take half a minute. Your team gets answers, not hunting expeditions." },
      { title: "New Hires Productive in Weeks", description: "They tap into decades of experience from day one. No more waiting months for them to learn who knows what." },
      { title: "5+ Hours Back Per Week", description: "Less hunting for information, more time for the work that matters. Per person. Do the math across your team." },
      { title: "Zero Data Leaves Your Building", description: "No third-party cloud breach can expose your patients. AI runs on your servers. Your compliance team will actually approve this." },
      { title: "One Place for Everything", description: "No more toggling between screens or calling around. Information flows where it needs to without replacing what you have." },
      { title: "Every Document Makes It Better", description: "Your knowledge base grows automatically. Add a new protocol, it's searchable immediately." },
    ],
    useCases: [
      { title: "Prior Auth in Minutes", description: "\"What clinical criteria does Blue Cross require for this MRI?\" Instant answer with the source document. No more digging through payer portals." },
      { title: "Denial Prevention", description: "Find the right payer requirement before submitting, not after the denial. AI checks documentation against what payers actually require." },
      { title: "\"What's our protocol for...?\"", description: "Staff ask questions in plain English. AI searches your documents and returns answers with sources." },
      { title: "New Hire Onboarding", description: "New team members can search every policy from day one. No more asking around or waiting for someone to show them." },
      { title: "Payer Requirements", description: "\"What does this payer require?\" AI checks the latest requirements and tells you what's needed." },
      { title: "Finding Information Fast", description: "\"What's our formulary policy?\" \"Who handles appeals at this payer?\" Instant answers from your own documents." },
    ],
    caseStudySlugs: ["agentic-document-intelligence"],
  },
  "legal": {
    challenges: [
      "Associates spending hours researching things the firm already figured out years ago",
      "Knowledge walking out the door every time a partner retires, with no way to get it back",
      "Decades of briefs, memos, and contracts sitting in folders nobody searches",
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
    caseStudySlugs: ["agentic-document-intelligence", "army-of-ai-agents"],
  },
  "commercial-real-estate": {
    challenges: [
      "You're sending mailers to the wrong people while missing actual owners entirely.",
      "Competitors reach the decision-maker before you figure out who that is.",
      "Data rooms take weeks to review. You find problems after you're committed.",
      "Every property uses different software. Getting a portfolio-wide view takes days.",
      "Quarterly investor reports eat days or weeks. And you're never confident they're right.",
      "$957B in CRE loans mature in 2025. That's nearly triple the 20-year average. Do you know which properties in your pipeline or portfolio are under pressure?",
      "CAM reconciliation errors cost 5-15% of recoverable expenses. Nobody catches them until it's a dispute.",
    ],
    solutions: [
      { title: "Find the Real Owner", description: "The property is owned by an LLC, which is owned by a trust, which is managed by another LLC. We trace through the layers to the actual decision-maker with 95%+ accuracy. Competitors using AI-only approaches hit 80%. Know who to call before they figure it out." },
      { title: "Due Diligence Overnight", description: "AI reads every lease, rent roll, and financial document. Pulls out key terms, renewal dates, and red flags. 85% faster with 99% accuracy. You get a summary in the morning." },
      { title: "Know Which Deals to Chase", description: "You have 10,000 targets. We score them based on what actually predicts a sale: hold period, tax situation, loan maturity, refinancing pressure. We tell you which 100 to call first." },
      { title: "One View, All Properties", description: "Yardi here, AppFolio there, MRI somewhere else, QuickBooks for accounting. We connect them all. See occupancy, NOI, and lease expirations across everything in one place." },
      { title: "Investor Reports in Hours", description: "Stop the quarterly scramble. We automate the data pull and consolidation. ILPA-compliant reports, ready to review. What took two weeks now takes a day." },
      { title: "Catch Renewals Early", description: "Know about lease expirations 6-9 months out, not 30 days. See which leases are below market. Priority ranking by revenue impact. Stop leaving money on the table." },
      { title: "Debt & Loan Intelligence", description: "Track loan maturities across your targets or portfolio. Identify properties facing refinancing pressure in the $957B maturity wave. Navigate with visibility, not surprises." },
      { title: "CAM Reconciliation", description: "Stop losing 5-15% of recoverable expenses to calculation errors. Automated CAM reconciliation across all lease types. Catch errors before they become tenant disputes." },
    ],
    benefits: [
      { title: "First to the Owner", description: "While competitors untangle LLCs with 80% accurate tools, you're already on the phone with the decision-maker. 95%+ accuracy means reaching the right person, not chasing dead ends." },
      { title: "Faster Due Diligence", description: "Review a data room overnight. 85% faster than manual. Know the red flags before you commit, not after." },
      { title: "Better Deal Selection", description: "Focus on properties most likely to trade, including those facing loan maturity pressure. Real patterns, not gut feeling." },
      { title: "Portfolio Visibility", description: "See all properties in one place, regardless of what software they use. Works with Yardi, AppFolio, MRI, QuickBooks, and 20+ other systems." },
      { title: "Reports That Don't Take Forever", description: "Quarterly investor reports in a day, not two weeks. 80% reduction in reporting time. ILPA-compliant, every time." },
      { title: "Recover Lost CAM Expenses", description: "Stop giving away 5-15% of recoverable expenses. Automated reconciliation catches errors before they become disputes." },
      { title: "Your Data Stays Yours", description: "Your pipeline, your portfolio data, your servers. Nothing goes to third parties." },
    ],
    useCases: [
      { title: "Fixing Broken Ownership Records", description: "1.69M property records with 95%+ accuracy. Same owner under ten different names. Different owners sharing the same ID. We sorted it all and identified 1.25M verified owners. The kind of entity resolution that CoStar and Reonomy can't match." },
      { title: "Overnight Data Room Review", description: "AI reads every document: rent rolls, leases, financials. 85% faster than manual review with 99% accuracy. Summary in the morning, red flags highlighted. What took 200 hours now takes 20." },
      { title: "Finding Off-Market Deals", description: "Owners who've held 10+ years. High tax burdens. Loans maturing in the next 12 months. Signs of motivation. Reach them before they list with a broker." },
      { title: "Portfolio Dashboard", description: "20 properties on 3 different systems. One view of occupancy, NOI, collections, and loan maturities. No more logging into four places to answer one question." },
      { title: "Faster Investor Reporting", description: "Data pulls automatically. ILPA-compliant reports in clicks. What took two weeks now takes a day. 80% reduction in reporting time." },
      { title: "Lease Renewal Pipeline", description: "Expirations 6-9 months out. Below-market rates flagged. Priority ranking by revenue impact. Nothing slips through." },
      { title: "CAM Recovery", description: "Property manager losing $40K/year in CAM reconciliation errors. Automated calculations across all lease types. Errors caught before tenant disputes. 5-15% of recoverable expenses back in your pocket." },
    ],
    caseStudySlugs: ["army-of-ai-agents"],
  },
  "manufacturing": {
    challenges: [
      "Customer calls about their order. Three people spend 30 minutes hunting through systems to give them an answer.",
      "You can't find enough people. The ones you have are stretched thin doing work that should take half the time.",
      "Production makes decisions based on yesterday's numbers. By the time you see a problem, it's already a fire.",
      "Sales promised Friday. Production found out Monday. Now everyone's scrambling to make it happen.",
      "Suppliers surprise you with delays. By the time you know, it's too late to adjust.",
      "You'd use AI, but your pricing and customer data are competitive advantage. Cloud tools aren't an option.",
    ],
    solutions: [
      { title: "Operational Visibility", description: "See orders, production, shipments, and quality in one place. Answer 'Where's my order?' in 30 seconds, not 30 minutes. At-risk orders flagged before they're late." },
      { title: "Do More With Your Team", description: "Your people spend hours on work that should take minutes. We automate the hunting and reconciling. Your team runs operations instead of chasing data." },
      { title: "Find Any Answer in Seconds", description: "Product specs from 70+ suppliers, searchable instantly. Ask 'What's the torque rating on the X200?' and get an answer with the source document. No hunting through folders." },
      { title: "Supply Chain Visibility", description: "Know what's coming from suppliers before delays become fires. Vendor performance tracking and early warning alerts so you can adjust before it's too late." },
      { title: "Clean Customer Data", description: "Duplicates, wrong contacts, outdated info everywhere? We cut duplicate hunting by 90% and clean your records so your team stops chasing dead ends." },
      { title: "AI That Stays In Your Building", description: "Your pricing and customer data never leave your servers. Full AI capabilities without the cloud risk. Works with NetSuite, Epicor, SAP Business One, Infor, and more." },
    ],
    benefits: [
      { title: "Do More Without Adding Headcount", description: "Support 20% more volume with your current team. Less time hunting for answers, more time running operations." },
      { title: "Orders On Time", description: "See at-risk orders before they're late. Less scrambling, more delivering on what you promised." },
      { title: "Less Firefighting", description: "Problems show up before they become emergencies. Your team reacts less and runs operations more." },
      { title: "Answers in Seconds", description: "Customer calls, you know. Spec question, you find it. No hunting through systems or calling around." },
      { title: "New Hires Productive Fast", description: "They search the same system everyone else uses. Weeks to useful, not months." },
      { title: "Works With Your ERP", description: "NetSuite, Epicor, SAP Business One, Infor, and more. We connect to what you have without replacing anything." },
    ],
    useCases: [
      { title: "\"Where's the Johnson order?\"", description: "Customer calls. You answer in 30 seconds, not 30 minutes. Status, shipping, quality, payment history. One place." },
      { title: "Morning Production Meeting", description: "Current numbers, not last night's export. Everyone sees the same data. Decisions based on what's actually happening." },
      { title: "CSR Handles 3x More Calls", description: "Customer service used to spend 30 minutes per inquiry. Now they answer in seconds and move on. Same team, triple the capacity." },
      { title: "New Rep Finds Their Own Answers", description: "They search the system instead of interrupting the veteran. Specs, procedures, pricing, customer history. All searchable." },
      { title: "Supplier Delays Don't Surprise You", description: "Know what's at risk before it's late. Adjust production schedules and customer expectations before problems compound." },
    ],
    caseStudySlugs: ["agentic-document-intelligence"],
  },
  "construction": {
    challenges: [
      "Job cost data scattered across eleven systems. Procore over here. Sage over there. Field notes somewhere else. Nobody has the full picture.",
      "Can't answer 'What's our margin on this job?' without two days of spreadsheet archaeology.",
      "Cash flow surprises. You're profitable on paper but scrambling to make payroll because receivables and retainage are invisible.",
      "Change orders approved in the field but never billed. That's 2-5% of revenue walking out the door.",
      "Can't find enough people, and you're not sure the crews you have are on the right jobs. No way to measure who's productive.",
      "WIP reports take a week to compile. By the time they're done, the numbers are already wrong.",
    ],
    solutions: [
      { title: "One View of Every Job", description: "We connect Procore, your accounting system (Sage, QuickBooks, Vista), and field apps into one dashboard. Answer 'How's this job doing?' in 30 seconds." },
      { title: "Real-Time Job Costing", description: "Cost-to-complete updated daily, not monthly. See margin problems at week 4, not closeout. Alerts when jobs drop below threshold." },
      { title: "Cash Flow Visibility", description: "See receivables, retainage, and payment timing across all projects. Know your cash position before it becomes a crisis." },
      { title: "Change Order Tracking", description: "Field approval triggers a billing alert within 7 days. Nothing slips through. Every T&M item tracked from approval to payment." },
      { title: "Crew Performance Visibility", description: "See which crews hit budget and schedule. Put your best people on the jobs that matter most. Do more with the team you have." },
      { title: "WIP Reports in Minutes", description: "Stop the monthly scramble. Data pulls automatically. What took a week now takes an hour." },
      { title: "Post-Acquisition Integration", description: "One dashboard across acquired companies in weeks. No waiting 18 months for system migration." },
    ],
    benefits: [
      { title: "Catch Problems Early", description: "Cost overruns visible at week 4, not month 8. Fix problems before they eat your contingency." },
      { title: "Stop Leaving Money Behind", description: "Every change order tracked. Nothing slips through unbilled. Contractors typically recover 2-5% of revenue." },
      { title: "Know Your Cash Position", description: "Receivables, retainage, and billing cycles visible in one place. No more payroll surprises." },
      { title: "WIP Without the Fire Drill", description: "Monthly close goes from a week to a day. Your controller does analysis, not data entry." },
      { title: "Live in Weeks, Not Years", description: "First dashboards in 4-6 weeks. Prove value before the big commitment." },
      { title: "Full Analytics Without the Headcount", description: "You get a data team without building a department. We fill the gap." },
    ],
    useCases: [
      { title: "\"What's our margin on this job?\"", description: "Real-time cost-to-complete across all projects. No more closeout surprises or spreadsheet hunting." },
      { title: "Unbilled Change Order Recovery", description: "PM approves extra work in the field. System flags for billing within 7 days. Nothing ages out unbilled." },
      { title: "Weekly Job Review Meeting", description: "Everyone sees the same real-time data. No more arguing about whose spreadsheet is right." },
      { title: "Cash Flow Forecasting", description: "See what's coming in, what's going out, and when. Plan ahead instead of reacting." },
      { title: "Board and Investor Reporting", description: "Portfolio dashboards that generate automatically. No fire drill before board meetings." },
      { title: "PM Performance Comparison", description: "Compare margin, schedule adherence, and change order rates across PMs. Accountability backed by data." },
    ],
    caseStudySlugs: [],
  },
  "wholesale-distribution": {
    challenges: [
      "15-25% of revenue tied up in inventory. Too much of the wrong stuff, not enough of the right.",
      "Customer profitability invisible until year-end, if ever. Some 'best customers' are actually money-losers.",
      "Pricing lives in spreadsheets and sales rep heads. Inconsistent, competitive intel missing.",
      "Demand forecasting based on 'last year plus 10%'. Always surprised by seasonality.",
      "Amazon and the nationals compete with data, speed, and personalization. You're using spreadsheets and gut feel.",
    ],
    solutions: [
      { title: "Inventory Intelligence", description: "Real-time visibility across all SKUs. Dead stock flagged automatically. Demand forecasting that actually predicts. Optimized reorder points. Free up cash tied in inventory that isn't moving." },
      { title: "Customer Profitability Analytics", description: "True margin by customer after cost-to-serve. See who actually makes you money vs. who just generates revenue. Align sales comp to margin, not just volume." },
      { title: "Pricing Visibility", description: "Real-time margin by product and customer. Pricing bands and guardrails. Exception alerts for below-margin deals. Stop giving away margin you don't have to." },
      { title: "Demand Forecasting", description: "Models that incorporate seasonality, trends, and sales pipeline, not just last year's numbers. Better forecasts mean better inventory decisions." },
      { title: "Post-Acquisition Unification", description: "Consolidated reporting across acquired entities in weeks. Customer deduplication. Unified analytics before full system migration." },
      { title: "Connected Systems", description: "ERP, WMS, CRM, and e-commerce connected into one view. No more logging into four systems to answer one question." },
    ],
    benefits: [
      { title: "Free Up Cash", description: "Identify dead stock, optimize inventory turns. Recover working capital tied up in products that don't move." },
      { title: "Protect Margin", description: "Pricing visibility and guardrails. 2-5% margin improvement from better pricing discipline alone." },
      { title: "Know Your Customers", description: "True profitability by customer, not just revenue. Focus on customers who actually make you money." },
      { title: "Fewer Stockouts", description: "30-50% reduction in stockouts through better forecasting. Stop losing sales you'll never know about." },
      { title: "Compete with Data", description: "Amazon uses data. Nationals use data. Now you can too, without building an IT department." },
      { title: "Fast Time to Value", description: "First deliverable in 4-6 weeks. Foundation in 8-12 weeks. Not the 18-month enterprise timeline." },
    ],
    useCases: [
      { title: "Dead Stock Identification", description: "Which SKUs haven't moved in 6 months? Flag them automatically. Liquidate before they become write-offs." },
      { title: "Customer Profitability Dashboard", description: "Your 'top 10 customers' ranked by actual margin, not revenue. Some surprises guaranteed." },
      { title: "Pricing Exception Alerts", description: "Deal below margin threshold? Alert fires before it's approved. Sales managers see the margin impact in real-time." },
      { title: "Inventory Turn Optimization", description: "From 4x turns to 6x turns by optimizing reorder points and reducing dead stock. That's 30% less cash tied up." },
      { title: "Post-Acquisition Consolidation", description: "Three ERPs from three acquisitions? One unified dashboard showing inventory, customers, and margin across all." },
      { title: "Demand Planning", description: "Forecasts that incorporate seasonality, sales pipeline, and market trends. Give suppliers accurate demand signals." },
    ],
    caseStudySlugs: ["what-predicts-lead-conversion", "army-of-ai-agents"],
  },
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
