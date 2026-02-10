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
    longDescription: "Most AI projects fail because the data underneath them is a mess. We connect your systems, clean the records, and build roadmaps that account for how your team actually works. You get clarity before you spend.",
    icon: "database",
    category: "data-ai-strategy",
    subServices: [
      {
        title: "Data Foundation",
        description: "One place for all your data, built so you're not redoing it in a year. The infrastructure that makes everything else possible.",
        icon: "database",
      },
      {
        title: "Data Integration",
        description: "Connect CRM, ERP, and everything else into one view. Your team gets answers instead of switching tabs.",
        icon: "link",
      },
      {
        title: "AI-Powered Data Cleanup",
        description: "Fix duplicates, standardize formats, resolve conflicting records at 80-90% less cost than manual review. The cleanup learns from your corrections.",
        icon: "sparkles",
      },
      {
        title: "AI Readiness Assessment",
        description: "Know exactly what's realistic before you invest. You get a clear picture of your data, your team's readiness, and where the quick wins are.",
        icon: "eye",
      },
      {
        title: "AI Roadmapping",
        description: "Stop guessing which AI projects will pay off. We prioritize by ROI and feasibility, then map out what gets delivered each quarter.",
        icon: "trending-up",
      },
      {
        title: "AI Governance & Compliance",
        description: "Your compliance team says yes on the first review. Bias monitoring, audit trails, and explainability built for healthcare, legal, and finance from day one.",
        icon: "book",
      },
    ],
    benefits: [
      { title: "Single Source of Truth", description: "All your data in one place. Consistent. Reliable. Done arguing about whose spreadsheet is right." },
      { title: "Avoid Costly Mistakes", description: "Know what's realistic before you spend. No failed pilots, no wasted investment." },
      { title: "Clear Roadmap", description: "A path from where you are to AI-enabled operations, with quarterly milestones and real accountability." },
    ],
    targetAudience: {
      profiles: [
        "Growing companies with data scattered across multiple systems that need a unified foundation",
        "Organizations preparing for AI adoption who want to avoid costly missteps",
        "Companies with messy or duplicated data affecting business decisions",
        "Teams tired of manual data cleanup and looking for sustainable solutions",
      ],
    },
    faqs: [
      {
        question: "How long does a data strategy engagement typically take?",
        answer: "You'll have a usable roadmap in 4-6 weeks. Not a thick report that sits on a shelf. A prioritized plan with quarterly milestones your team can actually execute.",
      },
      {
        question: "What if our data is scattered across many different systems?",
        answer: "You'll finally get a single view. We've connected 15+ systems into unified views for other clients. The right architecture upfront means adding new sources later is straightforward.",
      },
      {
        question: "Do we need to replace our existing systems?",
        answer: "Almost never. Your team keeps the tools they know. We connect and build on top of what you have, so you gain new visibility without the disruption of ripping and replacing.",
      },
      {
        question: "How do you handle data quality issues?",
        answer: "One client had 1.69 million messy records. We resolved them at 80-90% less cost than manual review. Our AI-powered cleanup learns from your corrections, so the system gets smarter over time.",
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
    longDescription: "Your team shouldn't wait days for a report that's already outdated. We build real-time visibility into sales, marketing, and operations. Anyone can ask questions in plain English and get answers instantly.",
    icon: "chart-bar",
    category: "analytics-bi",
    subServices: [
      {
        title: "Applications",
        description: "Your questions, answered visually. See what's happening across your business at a glance. KPIs, trends, and drill-downs that update in real time.",
        icon: "chart-bar",
      },
      {
        title: "Agentic Research",
        description: "Hours of research, done in minutes. AI agents that autonomously gather and synthesize information from multiple sources, then deliver a summary you can act on.",
        icon: "sparkles",
      },
      {
        title: "Operational Visibility",
        description: "Real-time views into daily operations. Know what's happening now, not what happened last month. Live monitoring and alerts.",
        icon: "eye",
      },
      {
        title: "Predictive Analytics",
        description: "See what's coming before it happens. Demand forecasts, churn predictions, and resource planning you can actually trust, powered by your data.",
        icon: "trending-up",
      },
      {
        title: "Managed Data Pipelines",
        description: "Reliable, automated data flows that keep your analytics fresh. We build and maintain the pipelines so you can focus on insights, not infrastructure.",
        icon: "link",
      },
      {
        title: "Custom Analytical Applications",
        description: "Purpose-built tools for your specific workflows. From interactive calculators to specialized reporting apps, analytics designed around how your team actually works.",
        icon: "cpu",
      },
    ],
    benefits: [
      { title: "Real-Time Visibility", description: "Know what's happening now, not last month." },
      { title: "Self-Service Answers", description: "Anyone can get answers without waiting for IT." },
      { title: "Predictive Power", description: "See what's coming before it happens." },
    ],
    targetAudience: {
      profiles: [
        "Companies making decisions on outdated spreadsheets and monthly reports",
        "Teams waiting days for IT to pull basic business data",
        "Organizations that want their people asking questions, not building reports",
        "Leaders who need real-time visibility into operations, not historical snapshots",
      ],
    },
    faqs: [
      {
        question: "Can anyone on our team ask questions in plain English?",
        answer: "Yes. Anyone can ask 'What were sales last quarter?' or 'Which customers are at risk?' and get instant, accurate answers. No SQL, no technical skills, no waiting for IT.",
      },
      {
        question: "How quickly can we get an application running?",
        answer: "First applications go live in 2-4 weeks. Something useful, in your hands, fast. Then we iterate based on what questions your team actually asks.",
      },
      {
        question: "What happens when our business needs change?",
        answer: "Your analytics grow with you. Adding new data sources, metrics, or views is straightforward because we build flexible foundations from the start. No rebuilding when your business evolves.",
      },
      {
        question: "Can this connect to our existing tools?",
        answer: "If your data lives somewhere, we can connect it. CRMs, ERPs, spreadsheets, databases, APIs. You keep what works and gain visibility you didn't have before.",
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
    longDescription: "AI that actually knows your business. Agents that handle research and workflows overnight. Document intelligence that pulls structured data from contracts and records. Knowledge systems that turn years of files into answers your team finds in seconds.",
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
        description: "AI built around your workflows, not the other way around. From document processing to decision automation, purpose-built for how you actually work.",
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
        description: "Contracts, invoices, medical records, legal documents. AI reads them, extracts the data, and structures it. At scale. Without the manual review.",
        icon: "book",
      },
      {
        title: "Staff AI Augmentation",
        description: "Your team does more with less. We redesign processes to cut the repetitive work, so your people focus on the work that actually matters.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      { title: "Plain English Queries", description: "Anyone asks, everyone gets answers. No technical skills required." },
      { title: "Privacy-First AI", description: "Your sensitive data stays on your servers. Full stop." },
      { title: "Knowledge at Scale", description: "Decades of expertise, accessible to every person on your team." },
    ],
    targetAudience: {
      profiles: [
        "Companies with valuable knowledge trapped in documents, emails, and people's heads",
        "Organizations in regulated industries needing AI that keeps data on-premises",
        "Teams drowning in repetitive tasks that could be automated",
        "Businesses ready to put AI to work but unsure where to start",
      ],
    },
    faqs: [
      {
        question: "Is our data safe with AI solutions?",
        answer: "Your data never leaves your building. For sensitive industries, we deploy models that run entirely on your servers. No external APIs, no cloud risk. Your compliance and legal teams can actually approve this.",
      },
      {
        question: "What's the difference between off-the-shelf and custom AI?",
        answer: "ChatGPT doesn't know your business. Purpose-built AI is trained on your documents, your processes, your terminology. It gives accurate, relevant answers because it actually understands your context. That's the difference between a party trick and a tool your team relies on.",
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
    longDescription: "The economics of custom software changed. What used to cost $200K+ and take a year now costs a fraction and ships in weeks. Senior engineers working with AI build purpose-built applications that fit your business exactly. No per-seat licensing. No annual renewals. You own every line of code.",
    icon: "code",
    category: "custom-software",
    subServices: [
      {
        title: "Custom Applications",
        description: "Internal tools, customer portals, workflow apps built for exactly how your team works. Not adapted from someone else's template.",
        icon: "code",
      },
      {
        title: "Data Pipelines & Integration",
        description: "Automated data flows that connect your systems and keep everything in sync. No more manual exports and copy-paste between tools.",
        icon: "link",
      },
      {
        title: "Process Automation",
        description: "The repetitive work your team does every day, automated. Approvals, notifications, data entry, report generation. Done without human intervention.",
        icon: "cpu",
      },
      {
        title: "API Development",
        description: "Connect your systems to each other and to the outside world. Custom APIs that let your tools talk to each other the way they should have from the start.",
        icon: "link",
      },
      {
        title: "Legacy System Modernization",
        description: "That ancient system everyone's afraid to touch? We replace it piece by piece. No big-bang migration. No downtime. Your team keeps working while the upgrade happens around them.",
        icon: "trending-up",
      },
      {
        title: "SaaS Replacement",
        description: "That $50K/year subscription with features you don't use? We build the 10% you actually need, purpose-built for your workflow. One-time cost. You own it outright.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      { title: "Own It Outright", description: "Your code. Your data. No per-seat fees, no annual renewals, no vendor holding your business hostage." },
      { title: "Weeks, Not Quarters", description: "Working software in your hands in 2-4 weeks. Not a roadmap. Not a prototype. Software your team uses." },
      { title: "Perfect Fit", description: "Every feature exists because your business needs it. Nothing you don't. 100% fit instead of the usual 70%." },
    ],
    targetAudience: {
      profiles: [
        "Companies paying for enterprise software they've outgrown or never fully used",
        "Teams drowning in workarounds because their tools don't quite fit",
        "Organizations tired of per-seat licensing costs that climb every year",
        "Businesses that need internal tools but can't justify six-figure development budgets",
      ],
    },
    faqs: [
      {
        question: "How can custom software cost less than SaaS?",
        answer: "AI made senior engineers 3-5x more productive. That productivity gain flows directly to you as lower costs. A custom app that would have cost $200K two years ago now costs $30K-$75K. One-time. Compare that to $50K+ per year in SaaS licensing that never stops.",
      },
      {
        question: "What happens after the project is done?",
        answer: "You own the code. Completely. Your team can maintain it, another developer can extend it, or we can provide ongoing support. No lock-in. No dependency. The code is yours to do whatever you want with.",
      },
      {
        question: "How do you deliver so fast?",
        answer: "Senior engineers working with AI handle the repetitive parts of development. That means more time on the parts that matter: understanding your business, designing the right solution, and making sure it actually works for your team. The quality goes up while the timeline comes down.",
      },
      {
        question: "What if we already have some systems in place?",
        answer: "Good. We build around what works. Your team keeps the tools they know. We fill the gaps and connect the pieces. No rip-and-replace unless that's what makes sense for your business.",
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
  { problem: "Want one place for all your data, not fifteen", service: "data-ai-strategy" },
  { problem: "Need to know what's realistic for AI before spending", service: "data-ai-strategy" },
  { problem: "Want answers now, not after someone pulls a report", service: "analytics-bi" },
  { problem: "Need to see what's happening today, not last month", service: "analytics-bi" },
  { problem: "Want AI doing the repetitive work so your team doesn't have to", service: "ai-services" },
  { problem: "Need decades of knowledge searchable in seconds", service: "ai-services" },
  { problem: "Paying for SaaS features you don't use and want something that actually fits", service: "custom-software" },
  { problem: "Need internal tools but can't justify a six-figure development budget", service: "custom-software" },
];

export function getServiceBySlug(slug: string): ConsolidatedService | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ConsolidatedService[] {
  return services.filter((s) => s.category === category);
}
