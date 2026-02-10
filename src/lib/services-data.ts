import type { Service } from "@/types";

export interface SubService {
  title: string;
  description: string;
  icon: string;
}

export interface TargetAudience {
  profiles: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ConsolidatedService extends Service {
  longDescription: string;
  subServices: SubService[];
  benefits: { title: string; description: string }[];
  targetAudience?: TargetAudience;
  faqs?: FAQItem[];
  processSteps?: ProcessStep[];
}

export const services: ConsolidatedService[] = [
  {
    slug: "data-ai-strategy",
    title: "Get Clarity",
    shortTitle: "Data & AI Strategy",
    description: "Get a single source of truth. Know what's realistic for AI. Start building on a foundation that won't crack.",
    longDescription: "Your ERP says one thing, your CRM says another, and the spreadsheet your controller maintains says something else entirely. We connect the systems, clean the records, and give you one version of the truth before you spend on AI.",
    icon: "database",
    category: "data-ai-strategy",
    subServices: [
      {
        title: "Data Foundation",
        description: "Five systems. Five versions of the same customer record. We build one foundation that connects them all. Your team stops reconciling and starts deciding.",
        icon: "database",
      },
      {
        title: "Data Integration",
        description: "Your ERP, CRM, project management, billing, and field tools weren't built to share data. We make them. One view of your business instead of fifteen browser tabs.",
        icon: "link",
      },
      {
        title: "AI-Powered Data Cleanup",
        description: "Duplicate customers, inconsistent vendor records, addresses that don't match. We've cleaned millions of records at a fraction of the cost of doing it by hand. The system learns from your corrections and gets smarter over time.",
        icon: "sparkles",
      },
      {
        title: "AI Readiness Assessment",
        description: "Your team tried ChatGPT. It hallucinated. Now leadership is skeptical. We show you where AI actually works for your business and where it doesn't. No hype. Just a clear picture of what's realistic.",
        icon: "eye",
      },
      {
        title: "AI Roadmapping",
        description: "Stop guessing which AI project to fund first. We prioritize by ROI and feasibility, then map out what gets delivered each quarter. Your board gets a plan they can track.",
        icon: "trending-up",
      },
      {
        title: "AI Governance & Compliance",
        description: "Your compliance team says yes on the first review. Bias monitoring, audit trails, and explainability built for healthcare, legal, and finance from day one.",
        icon: "book",
      },
    ],
    benefits: [
      { title: "One Version of the Truth", description: "Your team stops reconciling spreadsheets and starts making decisions. One number. One source. No more arguments about whose data is right." },
      { title: "AI That Actually Works", description: "Most AI pilots fail because the data underneath is a mess. Fix the foundation first and the AI projects that follow actually deliver." },
      { title: "Clear Roadmap", description: "Not a 50-page report that sits on a shelf. A prioritized plan your board can track, with quarterly milestones and clear ROI targets." },
    ],
    targetAudience: {
      profiles: [
        "Your team checks three systems to answer one question and still isn't sure they have the right number",
        "You tried an AI pilot and it failed because the data underneath was a mess",
        "Board meetings run on spreadsheets that someone spent two days manually compiling",
        "Duplicate records, inconsistent formats, and data entry errors are costing you real money",
      ],
    },
    faqs: [
      {
        question: "How long does a data strategy engagement typically take?",
        answer: "You'll have a usable roadmap in 4-6 weeks. Not a thick report that sits on a shelf. A prioritized plan with quarterly milestones your team can actually execute.",
      },
      {
        question: "We have data in 5+ systems. Can you actually unify that?",
        answer: "That's the most common starting point. ERP, CRM, project management, billing, field tools. We've connected 15+ systems into unified views. The right architecture upfront means adding new sources later is straightforward. Your team keeps every tool they currently use.",
      },
      {
        question: "Our last AI project didn't deliver. Why would this be different?",
        answer: "Most AI projects fail because they skip the foundation. The model is fine. The data underneath it isn't. We fix the data first, then build AI on top of something solid. That's why the projects that follow actually work.",
      },
      {
        question: "How do you handle data quality issues?",
        answer: "One client had 1.69 million messy records. Duplicates, conflicting addresses, inconsistent formats. We resolved them at 80-90% less cost than manual review. The AI-powered cleanup learns from your corrections, so the problem gets smaller over time instead of bigger.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Discovery",
        description: "We audit your current data landscape: what systems you have, how they connect (or don't), and where the gaps are.",
        duration: "Week 1",
      },
      {
        number: 2,
        title: "Architecture Design",
        description: "Design the data foundation that will power your AI initiatives. We map out connections, data flows, and governance.",
        duration: "Week 2-3",
      },
      {
        number: 3,
        title: "Roadmap Development",
        description: "Prioritize AI opportunities by ROI and feasibility. You get a clear roadmap with quarterly milestones.",
        duration: "Week 3-4",
      },
      {
        number: 4,
        title: "Implementation",
        description: "Execute in phases, delivering value at each step. We start with quick wins while building toward the larger vision.",
        duration: "Ongoing",
      },
    ],
  },
  {
    slug: "analytics-bi",
    title: "See What's Happening",
    shortTitle: "Analytics & BI",
    description: "See what's happening across your business right now. Ask questions in plain English. Get answers in seconds.",
    longDescription: "The report that takes a week to compile is already wrong by the time it's done. We replace the compile-and-present cycle with live answers. Ask a question, get the answer. Seconds, not days.",
    icon: "chart-bar",
    category: "analytics-bi",
    subServices: [
      {
        title: "Executive Dashboards",
        description: "The WIP report that took a week. The quarterly investor report that took 60 hours. The margin analysis that required spreadsheet archaeology. All of it, live. Updated without anyone touching a spreadsheet.",
        icon: "chart-bar",
      },
      {
        title: "Agentic Research",
        description: "Due diligence, competitor analysis, market research. AI agents gather and synthesize information from multiple sources overnight. Your team reviews a summary instead of spending days compiling one.",
        icon: "sparkles",
      },
      {
        title: "Operational Visibility",
        description: "Know which jobs are profitable today, not after the quarterly close. See order status, production capacity, delivery timelines, and per-location performance without calling three departments.",
        icon: "eye",
      },
      {
        title: "Predictive Analytics",
        description: "Demand forecasting that's better than 'last year plus 10%.' Inventory optimization that flags dead stock before it eats your working capital. Churn predictions that give you time to act.",
        icon: "trending-up",
      },
      {
        title: "Managed Data Pipelines",
        description: "Your analytics are only as good as the data feeding them. We build and maintain the pipelines that keep everything fresh and accurate, so your team trusts the numbers without checking the source.",
        icon: "link",
      },
      {
        title: "Custom Analytical Applications",
        description: "Profitability calculators, lease renewal trackers, change order monitors, customer scoring tools. Purpose-built analytics designed around the specific questions your business needs to answer.",
        icon: "cpu",
      },
    ],
    benefits: [
      { title: "Kill the Report Cycle", description: "The weekly report your team spends a day compiling? It updates itself. The data that took three phone calls to track down? It's on the screen." },
      { title: "Anyone Can Ask", description: "Your controller shouldn't be the only person who can answer margin questions. Plain English queries, instant answers, no SQL required." },
      { title: "See It Before It Hits", description: "At-risk orders before they're late. Inventory problems before they're stockouts. Cash flow gaps before they're emergencies." },
    ],
    targetAudience: {
      profiles: [
        "Board meetings run on spreadsheets someone spent two days manually compiling, and half the room questions the numbers",
        "Your team can't answer 'what's our margin on this job?' without checking three systems and making a phone call",
        "Quarterly reporting takes weeks of consolidation across multiple PM, accounting, or billing systems",
        "Inventory, backlog, or cash flow surprises keep hitting because the data is always a month behind",
      ],
    },
    faqs: [
      {
        question: "Our data lives in 5+ systems. Can you actually connect all of that?",
        answer: "That's the most common scenario. ERP, CRM, project management, billing, field apps, spreadsheets. We connect them into one view. Your team keeps every tool they use today and gains visibility they never had.",
      },
      {
        question: "How quickly can we see results?",
        answer: "First dashboards go live in 2-4 weeks. Not a prototype. Something your team uses every day. We start with the questions that matter most, then expand based on what your team actually asks.",
      },
      {
        question: "We've tried BI tools before and nobody used them. What's different?",
        answer: "Most BI projects fail because they're built around the data, not around the questions. We start with the decisions your team makes every day and work backward. When the dashboard answers the question someone was about to spend an hour on, they use it.",
      },
      {
        question: "Does this replace our existing reporting?",
        answer: "It replaces the manual work behind it. The person who spends a day every week compiling that report gets their day back. The report still exists. It just updates itself.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Requirements & Data Audit",
        description: "We understand what questions you need answered and audit your data sources to confirm we can answer them accurately.",
        duration: "Week 1",
      },
      {
        number: 2,
        title: "Data Pipeline Setup",
        description: "Connect your data sources and build reliable pipelines that keep your analytics fresh and accurate.",
        duration: "Week 2",
      },
      {
        number: 3,
        title: "Application Development",
        description: "Build the applications and analytics tools your team will actually use. We iterate based on real feedback.",
        duration: "Week 2-4",
      },
      {
        number: 4,
        title: "Training & Iteration",
        description: "Train your team to get the most from the tools. We continue refining based on the questions you ask.",
        duration: "Ongoing",
      },
    ],
  },
  {
    slug: "ai-services",
    title: "Put AI to Work",
    shortTitle: "AI & Automation",
    description: "Agents that work while you sleep. Documents that read themselves. Years of files, searchable in seconds.",
    longDescription: "Most AI adds work. Generate a draft, then review it for hallucinations. That's not saving time. That's adding a step. We build AI that removes steps entirely. Your team makes the judgment calls. The AI does the digging.",
    icon: "sparkles",
    category: "ai-services",
    subServices: [
      {
        title: "Natural Language BI",
        description: "Your team asks a question, gets an answer. Plain English, accurate results. No SQL, no waiting for reports, no bottleneck on IT.",
        icon: "chat",
      },
      {
        title: "Local LLM Integrations",
        description: "AI that stays on your servers. For privacy-sensitive industries, we deploy local language models that never send data to external APIs.",
        icon: "cpu",
      },
      {
        title: "Knowledge Management",
        description: "When someone leaves, their knowledge stays. AI-powered search across documents, emails, and systems so expertise isn't trapped in people's heads.",
        icon: "book",
      },
      {
        title: "AI Enablement",
        description: "AI built around your workflows, not bolted on top of them. We find the steps your team dreads and remove them. What's left is the work that actually requires human judgment.",
        icon: "cpu",
      },
      {
        title: "AI Agents & Automation",
        description: "You go home. The agents keep working. Research, customer service, data processing, complex workflows. Done by morning.",
        icon: "cpu",
      },
      {
        title: "RAG & Knowledge Systems",
        description: "Your documents become answerable. Ask a question, get the answer with the source. Searches across internal docs, policies, and historical data in seconds.",
        icon: "book",
      },
      {
        title: "Conversational AI",
        description: "Your team stops answering the same question for the hundredth time. Internal assistants and customer-facing chatbots powered by your data handle the repetitive inquiries automatically.",
        icon: "chat",
      },
      {
        title: "Document Intelligence",
        description: "A lawyer shouldn't re-read a contract to verify the AI didn't hallucinate. Our document systems extract structured data, cite the source, and flag what needs human attention. Your team reviews the exceptions, not every page.",
        icon: "book",
      },
      {
        title: "Staff AI Augmentation",
        description: "We don't give your team another tool to manage. We remove the steps they shouldn't be doing in the first place. The research, the data gathering, the compiling. Gone. What's left is the work that actually needs a human.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      { title: "Removes Work, Doesn't Add It", description: "No verification loops. No reviewing AI output on top of your actual work. The tedious steps disappear. Your team focuses on the decisions that matter." },
      { title: "Privacy-First AI", description: "Your sensitive data stays on your servers. Full stop. No external APIs, no cloud exposure, no compliance headaches." },
      { title: "Knowledge at Scale", description: "Decades of expertise, accessible to every person on your team. Ask a question, get the answer with the source document attached." },
    ],
    targetAudience: {
      profiles: [
        "You've tried AI tools and your team ended up verifying everything the AI produced",
        "Valuable knowledge is trapped in documents, emails, and people's heads with no way to search it",
        "Regulated industry where data can't leave your servers but you still need AI capabilities",
        "Your team spends hours on research, data gathering, and compiling that should be automated",
      ],
    },
    faqs: [
      {
        question: "Is our data safe with AI solutions?",
        answer: "Your data never leaves your building. For sensitive industries, we deploy models that run entirely on your servers. No external APIs, no cloud risk. Your compliance and legal teams can actually approve this.",
      },
      {
        question: "What's the difference between off-the-shelf and custom AI?",
        answer: "Generic AI makes your team verify everything it produces. It hallucinates, it guesses, it doesn't know your business. Purpose-built AI is trained on your documents with your context. It cites sources, flags uncertainty, and gives answers your team can trust without re-doing the work. That's the difference between adding a step and removing one.",
      },
      {
        question: "How long before we see results?",
        answer: "Your documents become searchable in weeks. Most AI implementations show value in 4-8 weeks. We start with quick wins, then expand to more complex automation as the system learns your business.",
      },
      {
        question: "Do we need technical staff to use this?",
        answer: "No. Your team asks questions in plain English and gets answers. We build for business users, not technicians. The complexity is under the hood where it belongs.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Use Case Discovery",
        description: "Identify the highest-value AI applications for your business. Where will AI save the most time or create the most value?",
        duration: "Week 1",
      },
      {
        number: 2,
        title: "Knowledge Ingestion",
        description: "We ingest your documents, data, and processes. The AI starts learning your business language and context.",
        duration: "Week 2-3",
      },
      {
        number: 3,
        title: "Build & Test",
        description: "Build the AI solution (whether it's document intelligence, agents, or knowledge systems) and test extensively with your team.",
        duration: "Week 3-6",
      },
      {
        number: 4,
        title: "Deploy & Expand",
        description: "Launch to your team and continue expanding capabilities. Each new document or feedback makes the system smarter.",
        duration: "Ongoing",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Build What You Need",
    shortTitle: "Custom Software",
    description: "Stop renting software you could own. Custom applications built for your exact workflow. Delivered in weeks. Yours forever.",
    longDescription: "The economics of custom software changed. What used to take a year and a massive budget now ships in weeks at a fraction of the cost. Purpose-built for your business. No per-seat licensing. No annual renewals. You own every line of code.",
    icon: "code",
    category: "custom-software",
    subServices: [
      {
        title: "Custom Applications",
        description: "Your team logs into four systems to answer one question. We build the single view that replaces the tab-switching, the copy-paste, and the 'let me check and get back to you.'",
        icon: "code",
      },
      {
        title: "System Integration",
        description: "Your ERP, CRM, PM tools, and accounting software weren't built to talk to each other. We make them. Automated data flows that keep everything in sync without the manual exports.",
        icon: "link",
      },
      {
        title: "Process Automation",
        description: "The weekly report that takes a day to compile. The approval chain that lives in email. The data entry someone does by hand every morning. We don't add a tool on top. We remove the step entirely.",
        icon: "cpu",
      },
      {
        title: "Compliance-Ready Solutions",
        description: "HIPAA, SOC 2, client confidentiality requirements that rule out cloud-based tools? We build on-premise and private-cloud solutions. Your data never leaves your control.",
        icon: "shield",
      },
      {
        title: "Legacy System Modernization",
        description: "That ancient system everyone's afraid to touch? We replace it piece by piece. No big-bang migration. No downtime. Your team keeps working while the upgrade happens around them.",
        icon: "trending-up",
      },
      {
        title: "SaaS Replacement",
        description: "You're paying enterprise prices for the 10% of features you actually use. We build that 10%, purpose-built for your workflow. One-time cost. You own it outright.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      { title: "Own It Outright", description: "Your code. Your data. No per-seat fees, no annual renewals, no vendor holding your business hostage." },
      { title: "Weeks, Not Quarters", description: "Working software in your hands in 2-4 weeks. Not a roadmap. Not a prototype. Software your team uses." },
      { title: "Fewer Steps, Not More Tools", description: "We don't add software your team has to learn. We remove the steps they shouldn't be doing. The end result is less work, not a new workflow to manage." },
    ],
    targetAudience: {
      profiles: [
        "Your team spends hours every week pulling data from one system and re-entering it in another",
        "You've outgrown basic tools but enterprise solutions cost six figures and take 18 months to implement",
        "Compliance requirements (HIPAA, client confidentiality, SOC 2) rule out most off-the-shelf AI and cloud tools",
        "You're paying per-seat licensing across multiple platforms that each solve 70% of the problem",
      ],
    },
    faqs: [
      {
        question: "How can custom software cost less than SaaS?",
        answer: "AI made senior engineers dramatically more productive. That gain flows directly to you as lower costs and faster timelines. A custom app that used to require a massive budget and a year of development now ships in weeks at a fraction of the old price. One-time. Compare that to SaaS licensing that never stops climbing.",
      },
      {
        question: "What about HIPAA, SOC 2, or client confidentiality?",
        answer: "We build compliance in from day one. For healthcare, that means solutions where patient data never leaves your servers. For law firms, client work product stays under your roof. For regulated industries, we build to the standard your compliance team requires. Not as an afterthought. As the starting point.",
      },
      {
        question: "What if we already have systems in place?",
        answer: "Good. We build around what works. Your ERP stays. Your PM tool stays. Your CRM stays. We fill the gaps between them and connect the pieces so your team stops logging into four systems to answer one question.",
      },
      {
        question: "What happens after the project is done?",
        answer: "You own the code. Completely. Your team can maintain it, another developer can extend it, or we can provide ongoing support. No lock-in. No dependency. The code is yours to do whatever you want with.",
      },
      {
        question: "How do you deliver so fast?",
        answer: "Senior engineers working with AI handle the repetitive parts of development. That means more time on the parts that matter: understanding your business, designing the right solution, and making sure it actually works for your team. The quality goes up while the timeline comes down.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Discovery",
        description: "We learn how your team actually works. Not the org chart version. The real version. What slows people down, what's missing, what would make their day easier.",
        duration: "Week 1",
      },
      {
        number: 2,
        title: "Design & Prototype",
        description: "You see the solution before we build it. Interactive prototypes your team can click through and react to. Changes are cheap at this stage.",
        duration: "Week 2",
      },
      {
        number: 3,
        title: "Build & Iterate",
        description: "We build in short cycles with your feedback at every step. You're never surprised by the end result because you've been shaping it the whole time.",
        duration: "Week 2-6",
      },
      {
        number: 4,
        title: "Deploy & Handoff",
        description: "Go live with your team trained and confident. Full documentation, source code, and the knowledge to maintain it yourselves. Or we stick around. Your call.",
        duration: "Week 6-8",
      },
    ],
  },
];

export const serviceCategories = {
  "data-ai-strategy": {
    title: "Data & AI Strategy",
    subtitle: "Get Clarity",
    description: "One source of truth. A realistic AI roadmap. Clean data that doesn't need fixing twice.",
    position: "Start here",
    message: "Every good decision starts with knowing what you're working with. This is where you get clarity.",
  },
  "analytics-bi": {
    title: "Analytics & BI",
    subtitle: "See What's Happening",
    description: "Real-time visibility into your business. Ask questions in plain English. Get answers in seconds.",
    position: "See clearly",
    message: "Your team shouldn't wait for reports. They should ask a question and get an answer. Right now.",
  },
  "ai-services": {
    title: "AI & Automation",
    subtitle: "Put AI to Work",
    description: "Agents that work overnight. Documents that read themselves. Years of files, searchable in seconds.",
    position: "Work smarter",
    message: "Not AI as a concept. AI that shows up, does the work, and saves your team hours every week.",
  },
  "custom-software": {
    title: "Custom Software",
    subtitle: "Build What You Need",
    description: "Stop renting software you could own. Purpose-built applications delivered in weeks.",
    position: "Own it",
    message: "The economics changed. Custom software that fits your exact workflow now costs less than a year of SaaS licensing.",
  },
};

export const serviceDecisionHelper = [
  { problem: "Your team checks three systems and still isn't sure they have the right number", service: "data-ai-strategy" },
  { problem: "Your last AI project failed because the data underneath was a mess", service: "data-ai-strategy" },
  { problem: "Someone on your team spends a day every week compiling a report that's outdated by Friday", service: "analytics-bi" },
  { problem: "You can't answer basic margin or profitability questions without spreadsheet archaeology", service: "analytics-bi" },
  { problem: "Your team tried AI tools and ended up verifying everything the AI produced", service: "ai-services" },
  { problem: "Decades of knowledge trapped in documents and people's heads with no way to search it", service: "ai-services" },
  { problem: "Your team logs into four systems to answer one question", service: "custom-software" },
  { problem: "Compliance rules out most cloud tools but you still need the capability", service: "custom-software" },
];

export function getServiceBySlug(slug: string): ConsolidatedService | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ConsolidatedService[] {
  return services.filter((s) => s.category === category);
}
