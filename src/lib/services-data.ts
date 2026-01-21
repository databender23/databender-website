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
    title: "Data & AI Strategy",
    shortTitle: "Data & AI Strategy",
    description: "Connect your systems, clean your data, and map out AI adoption that actually sticks.",
    longDescription: "AI projects fail when the data isn't ready. We connect your systems, clean the messy records, assess what's realistic, and build roadmaps that account for how your team actually works.",
    icon: "database",
    category: "data-ai-strategy",
    subServices: [
      {
        title: "Data Foundation",
        description: "Data warehouse, pipelines, and governance, built so you're not redoing it in a year. The infrastructure that makes everything else possible.",
        icon: "database",
      },
      {
        title: "Data Integration",
        description: "Connect CRM, ERP, and everything else into one view. No more switching tabs to piece together answers.",
        icon: "link",
      },
      {
        title: "AI-Powered Data Cleanup",
        description: "Fix duplicates, standardize formats, resolve conflicting records at 80-90% less cost than manual review. The cleanup learns from your corrections.",
        icon: "sparkles",
      },
      {
        title: "AI Readiness Assessment",
        description: "We evaluate your data, your team, and your org. You get a clear picture of what's realistic and where the quick wins are before you invest.",
        icon: "eye",
      },
      {
        title: "AI Roadmapping",
        description: "Which AI projects will actually pay off? We prioritize by ROI and feasibility, then map out what gets delivered each quarter.",
        icon: "trending-up",
      },
      {
        title: "AI Governance & Compliance",
        description: "Bias monitoring, audit trails, explainability: the controls your compliance team needs. Built for healthcare, legal, and finance from day one.",
        icon: "book",
      },
    ],
    benefits: [
      { title: "Single Source of Truth", description: "All your data in one place, consistent and reliable." },
      { title: "Avoid Costly Mistakes", description: "Strategic planning prevents failed AI projects and wasted investment." },
      { title: "Clear Roadmap", description: "A path from where you are to AI-enabled operations, with quarterly milestones." },
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
        answer: "Most strategy engagements run 4-6 weeks, depending on complexity. We focus on delivering roadmaps you can actually use, not thick reports that sit on a shelf.",
      },
      {
        question: "What if our data is scattered across many different systems?",
        answer: "That's exactly what we specialize in. We've connected data from 15+ systems into unified views. The key is building the right architecture upfront so adding new sources becomes straightforward.",
      },
      {
        question: "Do we need to replace our existing systems?",
        answer: "Rarely. We typically connect and enhance what you already have rather than ripping and replacing. Your team keeps the tools they know while gaining new capabilities.",
      },
      {
        question: "How do you handle data quality issues?",
        answer: "We use AI-powered cleanup that learns from your corrections. One client had 1.69 million messy records. We resolved them at 80-90% less cost than manual review. The system gets smarter over time.",
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
    title: "Analytics & BI",
    shortTitle: "Analytics & BI",
    description: "Real-time applications, natural language insights, and visibility into sales, marketing, and operations.",
    longDescription: "Stop waiting for reports. We build tools for real-time visibility into your sales, marketing, and operations. Anyone on your team can ask questions in plain English and get answers instantly.",
    icon: "chart-bar",
    category: "analytics-bi",
    subServices: [
      {
        title: "Applications",
        description: "Visual applications that answer your questions. See what's happening across your business at a glance: KPIs, trends, and drill-downs.",
        icon: "chart-bar",
      },
      {
        title: "Agentic Research",
        description: "AI agents that autonomously gather, analyze, and synthesize information from multiple sources, turning hours of research into minutes.",
        icon: "sparkles",
      },
      {
        title: "Operational Visibility",
        description: "Real-time views into daily operations. Know what's happening now, not what happened last month. Live monitoring and alerts.",
        icon: "eye",
      },
      {
        title: "Predictive Analytics",
        description: "Forecasts and predictions you can actually trust. Demand planning, churn prediction, and resource optimization powered by your data.",
        icon: "trending-up",
      },
      {
        title: "Managed Data Pipelines",
        description: "Reliable, automated data flows that keep your analytics fresh. We build and maintain the pipelines so you can focus on insights, not infrastructure.",
        icon: "link",
      },
      {
        title: "Custom Analytical Applications",
        description: "Purpose-built tools for your specific workflows. From interactive calculators to specialized reporting apps, analytics tailored to how your team actually works.",
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
        answer: "Yes. We build natural language interfaces so anyone can ask 'What were sales last quarter?' or 'Which customers are at risk?' and get instant, accurate answers. No SQL or technical skills required.",
      },
      {
        question: "How quickly can we get an application running?",
        answer: "First applications typically go live in 2-4 weeks. We prioritize getting something useful in your hands quickly, then iterate based on what questions you actually ask.",
      },
      {
        question: "What happens when our business needs change?",
        answer: "The applications and analytics we build are designed to evolve. Adding new data sources, metrics, or views is straightforward because we build flexible foundations from the start.",
      },
      {
        question: "Can this connect to our existing tools?",
        answer: "We integrate with virtually any data source: CRMs, ERPs, spreadsheets, databases, and APIs. If your data lives somewhere, we can connect it.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Requirements & Data Audit",
        description: "We understand what questions you need answered and audit your data sources to ensure we can answer them accurately.",
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
    title: "AI & Automation",
    shortTitle: "AI & Automation",
    description: "AI agents that work autonomously, document intelligence that extracts data at scale, and knowledge systems that make your files searchable.",
    longDescription: "AI that actually knows your business. We build agents that handle research and workflows while you sleep. Document intelligence that pulls structured data from contracts and records. Knowledge systems that turn years of files into answers your team can find in seconds.",
    icon: "sparkles",
    category: "ai-services",
    subServices: [
      {
        title: "Natural Language BI",
        description: "Ask questions in plain English, get accurate answers. No SQL required, no waiting for reports. Your team can query data conversationally.",
        icon: "chat",
      },
      {
        title: "Local LLM Integrations",
        description: "AI that stays on your servers. For privacy-sensitive industries, we deploy local language models that never send data to external APIs.",
        icon: "cpu",
      },
      {
        title: "Knowledge Management",
        description: "Capture and surface institutional knowledge. AI-powered search across documents, emails, and systems so expertise isn't trapped in people's heads.",
        icon: "book",
      },
      {
        title: "AI Enablement",
        description: "Custom AI solutions for your specific workflows. From document processing to decision automation, AI built for how you actually work.",
        icon: "cpu",
      },
      {
        title: "AI Agents & Automation",
        description: "Custom autonomous agents that handle research, customer service, data processing, and complex workflows. AI that works while you sleep.",
        icon: "cpu",
      },
      {
        title: "RAG & Knowledge Systems",
        description: "Turn your documents into answerable knowledge. Custom Q&A systems that search across internal docs, policies, and historical data with accurate, sourced answers.",
        icon: "book",
      },
      {
        title: "Conversational AI",
        description: "Internal assistants and customer-facing chatbots powered by your data. They answer questions, route requests, and handle the repetitive inquiries so your team doesn't have to.",
        icon: "chat",
      },
      {
        title: "Document Intelligence",
        description: "AI-powered extraction from contracts, invoices, medical records, and legal documents. Structured data from unstructured documents at scale.",
        icon: "book",
      },
      {
        title: "Staff AI Augmentation",
        description: "Implement new processes and improve current ones to reduce repetitive work for employees, allowing you to do more with less.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      { title: "Plain English Queries", description: "Anyone can ask questions and get accurate answers." },
      { title: "Privacy-First AI", description: "Local models that keep your sensitive data on-premises." },
      { title: "Knowledge at Scale", description: "Institutional knowledge accessible to everyone." },
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
        answer: "We specialize in privacy-first AI. For sensitive industries, we deploy models that run entirely on your servers. No data ever leaves your building. Your compliance and legal teams can actually approve this.",
      },
      {
        question: "What's the difference between off-the-shelf and custom AI?",
        answer: "Off-the-shelf tools like ChatGPT don't know your business. Custom AI is trained on your documents, your processes, your terminology. It gives accurate, relevant answers because it actually understands your context.",
      },
      {
        question: "How long before we see results?",
        answer: "Most AI implementations show value in 4-8 weeks. We start with quick wins (like making your documents searchable), then expand to more complex automation as the system learns your business.",
      },
      {
        question: "Do we need technical staff to use this?",
        answer: "No. We design for business users. Your team asks questions in plain English and gets answers. We handle the technical complexity so you can focus on using the insights.",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Use Case Discovery",
        description: "Identify the highest-value AI applications for your business. Where will AI save the most time or unlock the most value?",
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
];

export const serviceCategories = {
  "data-ai-strategy": {
    title: "Data & AI Strategy",
    subtitle: "Get the data right",
    description: "Connect your systems, clean your data, and map out AI adoption that sticks.",
    position: "Start here",
    message: "AI projects fail on bad data. This is where you fix that.",
  },
  "analytics-bi": {
    title: "Analytics & BI",
    subtitle: "See what's happening",
    description: "Real-time visibility into sales, marketing, and operations, plus natural language insights.",
    position: "See clearly",
    message: "Stop waiting for reports. Ask questions in plain English and see what's happening now.",
  },
  "ai-services": {
    title: "AI & Automation",
    subtitle: "Work smarter with AI",
    description: "AI agents, document intelligence, and knowledge systems that make your business searchable.",
    position: "Work smarter",
    message: "Agents that work while you sleep. Documents that extract themselves. Files that answer questions.",
  },
};

export const serviceDecisionHelper = [
  { problem: "Data in too many places, no single source of truth", service: "data-ai-strategy" },
  { problem: "Need a realistic roadmap for AI adoption", service: "data-ai-strategy" },
  { problem: "Can't get answers without waiting for someone to pull a report", service: "analytics-bi" },
  { problem: "Need to see operations in real time, not last month", service: "analytics-bi" },
  { problem: "Want AI to handle the repetitive tasks", service: "ai-services" },
  { problem: "Knowledge trapped in documents and people's heads", service: "ai-services" },
];

export function getServiceBySlug(slug: string): ConsolidatedService | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ConsolidatedService[] {
  return services.filter((s) => s.category === category);
}
