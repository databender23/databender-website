import type { Service } from "@/types";

export interface SubService {
  title: string;
  description: string;
  icon: string;
}

export interface ConsolidatedService extends Service {
  longDescription: string;
  subServices: SubService[];
  benefits: { title: string; description: string }[];
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
        description: "Fix duplicates, standardize formats, resolve conflicting records at 125x less cost than manual review. The cleanup learns from your corrections.",
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
  },
  {
    slug: "analytics-bi",
    title: "Analytics & BI",
    shortTitle: "Analytics & BI",
    description: "Visual dashboards, real-time visibility, and predictive insights for your whole operation.",
    longDescription: "You shouldn't have to ask someone to pull a report. You shouldn't wait until month-end to know how you're doing. We build dashboards and analytics that give you visibility into your whole operation, including predictions about what's coming next.",
    icon: "chart-bar",
    category: "analytics-bi",
    subServices: [
      {
        title: "Dashboards",
        description: "Visual dashboards that answer your questions. See what's happening across your business at a glance: KPIs, trends, and drill-downs.",
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
  },
  {
    slug: "ai-services",
    title: "AI Services & Automation",
    shortTitle: "AI Services & Automation",
    description: "Natural language queries, knowledge management, and AI automation, built on your data.",
    longDescription: "We build AI that works because we build it on clean data. Natural language queries your team can actually use. Knowledge systems that surface what's buried in documents. Automation that handles the repetitive stuff.",
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
    description: "Dashboards, operational visibility, and predictive insights for your whole operation.",
    position: "See clearly",
    message: "Stop waiting for reports. See what's happening now, and what's coming next.",
  },
  "ai-services": {
    title: "AI Services & Automation",
    subtitle: "Work smarter with AI",
    description: "Natural language queries, knowledge management, and AI automation built on your data.",
    position: "Work smarter",
    message: "AI that works because it's built on clean data and designed for how your team operates.",
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
