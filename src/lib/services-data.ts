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
    description: "Build a solid data foundation, assess AI readiness, and create actionable roadmaps for adoption.",
    longDescription: "Success with AI starts with clean, connected data and a clear strategy. We help you build the foundation—connecting systems, cleaning data, assessing readiness—and chart the path forward with realistic roadmaps and responsible AI practices.",
    icon: "database",
    category: "data-ai-strategy",
    subServices: [
      {
        title: "Data Foundation",
        description: "Build the infrastructure for everything else. A solid foundation that scales as you grow—data warehouse, pipelines, and governance built right.",
        icon: "database",
      },
      {
        title: "Data Integration",
        description: "Connect all your systems into one unified view. Stop switching between tabs and spreadsheets to get answers. Real-time sync across CRM, ERP, and everything else.",
        icon: "link",
      },
      {
        title: "AI-Powered Data Cleanup",
        description: "Intelligent data cleaning that improves over time. Fix duplicates, standardize formats, and resolve entities at 125x less cost than manual review.",
        icon: "sparkles",
      },
      {
        title: "AI Readiness Assessment",
        description: "Comprehensive evaluation of your data infrastructure, team capabilities, and organizational readiness. We identify gaps and quick wins before you invest in AI.",
        icon: "eye",
      },
      {
        title: "AI Roadmapping",
        description: "Strategic planning that prioritizes AI initiatives based on ROI, feasibility, and business impact. Clear milestones, resource requirements, and success metrics.",
        icon: "trending-up",
      },
      {
        title: "AI Governance & Compliance",
        description: "Responsible AI frameworks for regulated industries. Bias monitoring, audit trails, explainability requirements, and compliance documentation for healthcare, legal, and finance.",
        icon: "book",
      },
    ],
    benefits: [
      { title: "Single Source of Truth", description: "All your data in one place, consistent and reliable." },
      { title: "Avoid Costly Mistakes", description: "Strategic planning prevents failed AI projects and wasted investment." },
      { title: "Actionable Roadmap", description: "Clear path from current state to AI-enabled operations." },
    ],
  },
  {
    slug: "analytics-bi",
    title: "Analytics & BI",
    shortTitle: "Analytics & BI",
    description: "Visual dashboards, real-time visibility, and predictive insights for your whole operation.",
    longDescription: "You shouldn't have to ask someone to pull a report. You shouldn't wait until month-end to know how you're doing. We build dashboards and analytics that give you visibility into your whole operation—including predictions about what's coming next.",
    icon: "chart-bar",
    category: "analytics-bi",
    subServices: [
      {
        title: "Dashboards",
        description: "Visual dashboards that answer your real questions. See what's happening across your business at a glance—KPIs, trends, and drill-downs.",
        icon: "chart-bar",
      },
      {
        title: "Agentic Research",
        description: "AI agents that autonomously gather, analyze, and synthesize information from multiple sources—turning hours of research into minutes.",
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
        description: "Purpose-built tools for your specific workflows. From interactive calculators to specialized reporting apps—analytics tailored to how your team actually works.",
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
    title: "AI Services",
    shortTitle: "AI Services",
    description: "AI enablement, knowledge management, and natural language interfaces that actually work.",
    longDescription: "AI isn't magic—it's only as good as the data and implementation underneath. We build AI that works: natural language queries, automated insights, knowledge management, and custom AI enablement tailored to your business.",
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
        description: "Custom AI solutions for your specific workflows. From document processing to decision automation—AI built for how you actually work.",
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
        description: "Internal assistants and customer-facing chatbots powered by your data. LLM-based systems that understand context and provide helpful, accurate responses.",
        icon: "chat",
      },
      {
        title: "Document Intelligence",
        description: "AI-powered extraction from contracts, invoices, medical records, and legal documents. Structured data from unstructured documents at scale.",
        icon: "book",
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
    subtitle: "Build the foundation",
    description: "Build a solid data foundation, assess AI readiness, and create actionable roadmaps.",
    position: "Start here",
    message: "Clean, connected data and a clear strategy are the foundation for AI success.",
  },
  "analytics-bi": {
    title: "Analytics & BI",
    subtitle: "See what's happening",
    description: "Visual dashboards, real-time visibility, and predictive insights for your whole operation.",
    position: "See clearly",
    message: "Once your data is ready, you can finally see what's happening across your business.",
  },
  "ai-services": {
    title: "AI Services",
    subtitle: "Work smarter with AI",
    description: "AI enablement, knowledge management, and natural language interfaces that actually work.",
    position: "Work smarter",
    message: "With clean data and clear visibility, AI can actually deliver on its promises.",
  },
};

export const serviceDecisionHelper = [
  { problem: "Data scattered across systems with no single source of truth", service: "data-ai-strategy" },
  { problem: "Need a roadmap for AI adoption", service: "data-ai-strategy" },
  { problem: "Can't get answers without waiting for reports", service: "analytics-bi" },
  { problem: "Need real-time visibility into operations", service: "analytics-bi" },
  { problem: "Want to automate repetitive tasks with AI", service: "ai-services" },
  { problem: "Knowledge trapped in documents and people's heads", service: "ai-services" },
];

export function getServiceBySlug(slug: string): ConsolidatedService | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ConsolidatedService[] {
  return services.filter((s) => s.category === category);
}
