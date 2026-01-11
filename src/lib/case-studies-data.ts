// Case Studies Data

export interface CaseStudyResult {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industryCategory: string;
  services: string[];
  challengeType: string;
  challengeBrief: string;
  challenge: string;
  solution: string;
  approach: string[];
  results: CaseStudyResult[];
  resultHighlight: string;
  quote: string;
  quoteAuthor?: string;
  quoteRole?: string;
  images: string[];
  thumbnail: string;
  featured: boolean;
}

export interface Testimonial {
  highlight: string;
  quote: string;
  name: string;
  title: string;
  company?: string;
  industry: string;
}

// Filter categories
export const industryFilters = [
  "All Industries",
  "Professional Services",
  "Healthcare & Dental",
  "Commercial Real Estate",
  "Manufacturing",
  "Energy",
  "Home Services",
];

export const challengeFilters = [
  "All Challenges",
  "Scattered Data",
  "Manual Reporting",
  "No Visibility",
  "Data Quality",
  "AI/Automation",
];

export const serviceFilters = [
  "All Services",
  "Data Integration",
  "Data Cleanup",
  "Dashboards & Analytics",
  "AI & Automation",
  "Predictive Analytics",
  "Document Intelligence",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-entity-resolution",
    title: "AI Entity Resolution for Mineral Rights",
    client: "Energy Sector Client",
    industry: "Energy",
    industryCategory: "Energy",
    services: ["AI Data Cleanup", "Data Integration"],
    challengeType: "Data Quality",
    challengeBrief: "1.69 million records with complex ownership relationships needed resolution.",
    challenge: "A mineral rights company needed to resolve 1.69 million ownership records across multiple legacy systems. Manual review would have taken months and cost over $25,000 in analyst time. Accuracy was critical for legal and financial decisions.",
    solution: "We deployed AI-powered entity resolution that learned the company's specific data patterns and business rules. The system processed records at machine speed while documenting every decision for audit compliance.",
    approach: [
      "Analyzed data patterns and identified key matching criteria",
      "Trained AI models on sample datasets with expert validation",
      "Processed 1.69M records with human-level accuracy",
      "Generated full audit trail for every decision",
      "Delivered results in 3 weeks vs estimated 6+ months manual",
    ],
    results: [
      { value: 125, suffix: "x", label: "Cost savings vs manual" },
      { value: 1.69, suffix: "M", label: "Records processed" },
      { value: 3, label: "Weeks to completion" },
      { value: 100, suffix: "%", label: "Decision documentation" },
    ],
    resultHighlight: "125x cost savings",
    quote: "What would cost $25,000+ in analyst time, AI completed for ~$200—with every decision documented for audit.",
    images: [
      "/images/case-studies/entity-resolution-1-1.png",
      "/images/case-studies/entity-resolution-2-1.png",
    ],
    thumbnail: "/images/case-studies/entity-resolution-1-1.png",
    featured: true,
  },
  {
    slug: "custom-lead-scoring",
    title: "Custom Lead Scoring for Home Services",
    client: "Roofing Company",
    industry: "Home Services",
    industryCategory: "Home Services",
    services: ["AI Insights", "Predictive Analytics"],
    challengeType: "AI/Automation",
    challengeBrief: "Generic CRM scoring wasn't identifying the right leads.",
    challenge: "A growing roofing company was using generic CRM lead scoring that wasn't identifying the right leads. Their sales team was wasting time on low-quality prospects while high-value opportunities slipped through.",
    solution: "We built a custom ML scoring model trained on their actual conversion data. The model discovered patterns that generic tools missed—factors like home equity, urgency signals, and local sales history that actually predicted conversions.",
    approach: [
      "Analyzed historical conversion data to identify real predictors",
      "Built custom ML model trained on company-specific patterns",
      "Discovered that home equity and urgency signals outperformed generic metrics",
      "Integrated scoring into existing CRM workflow",
      "Provided ongoing model refinement as new data accumulated",
    ],
    results: [
      { value: 21, suffix: "%", prefix: "+", label: "More qualified leads" },
      { value: 35, suffix: "%", label: "Reduction in wasted calls" },
      { value: 2, suffix: "x", label: "Conversion rate improvement" },
      { value: 4, label: "Weeks to deployment" },
    ],
    resultHighlight: "+21% qualified leads",
    quote: "Generic tools said home value mattered most. Our model discovered home equity, urgency, and local sales history are what actually predict conversions.",
    images: [
      "/images/case-studies/lead-scoring-1-1.png",
      "/images/case-studies/lead-scoring-2-1.png",
    ],
    thumbnail: "/images/case-studies/lead-scoring-1-1.png",
    featured: true,
  },
  {
    slug: "agentic-document-intelligence",
    title: "Agentic Document Intelligence for Medical Devices",
    client: "Medical Device Manufacturer",
    industry: "Healthcare",
    industryCategory: "Healthcare & Dental",
    services: ["AI & Automation", "Document Intelligence"],
    challengeType: "AI/Automation",
    challengeBrief: "Manual document processing costing $10K+ with ongoing validation needs.",
    challenge: "A medical device manufacturer spent $10,000 on traditional OCR to process regulatory documents—and still needed manual validation for every extraction. The documents were complex PDFs with tables, footnotes, and cross-references that broke standard extraction tools.",
    solution: "We built an agentic document processing system where specialized AI agents work together: one orchestrates the workflow, others extract specific data types in parallel, and a validation agent checks everything before output. The system runs autonomously with no manual review required.",
    approach: [
      "Designed multi-agent architecture with orchestrator, extractors, and validator",
      "Built specialized extraction agents for tables, text, and cross-references",
      "Implemented autonomous validation that catches errors before output",
      "Created self-healing workflows that retry failed extractions",
      "Deployed system that processes new documents automatically",
    ],
    results: [
      { value: 1000, suffix: "+", label: "PDFs processed" },
      { value: 50, suffix: "%", label: "Cost reduction vs OCR" },
      { value: 0, label: "Manual validation needed" },
      { value: 99, suffix: "%", label: "Extraction accuracy" },
    ],
    resultHighlight: "50% cost savings",
    quote: "We spent $10K on OCR that still needed manual validation. The agentic approach cost half that—and runs itself.",
    images: [
      "/images/case-studies/document-intelligence-1.png",
      "/images/case-studies/document-intelligence-2.png",
    ],
    thumbnail: "/images/case-studies/document-intelligence-1.png",
    featured: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    highlight: "An incredible asset — highly detail-oriented, responsive, and adaptable.",
    quote: "Databender has been an incredible asset during our proof of concept. Their deep knowledge of data concepts and engineering best practices helped our team establish a strong foundation for the project. They are highly detail-oriented, responsive, and adaptable — even accommodating last-minute changes with ease. I truly appreciate their collaborative approach and would gladly work with them again. Highly recommended!",
    name: "Rajiv Vuddaraju",
    title: "Senior Lead Analytics Consultant",
    company: "Wells Fargo",
    industry: "Financial Services",
  },
  {
    highlight: "Technically sound, scalable, well-documented, and aligned with best practices.",
    quote: "We engaged Databender to develop a system that processes large amounts of data sourced from a variety of formats. One of their standout qualities was an ability to translate our high-level requirements into a well-structured, modular architecture that effectively manages process transitions in accordance with our business requirements. They expertly mapped dependencies and optimized data flows with both performance and maintainability in mind. Their technical expertise in designing and implementing robust system architectures produced a work product that is not only technically sound but scalable, well-documented and aligned with industry best practices. Because of their deep technical skills and flawless execution, I would recommend them without hesitation to anyone seeking a team who can handle complex systems work with precision, transparency, and professionalism.",
    name: "Jay Williamson",
    title: "Founder",
    company: "Health Price Compare",
    industry: "Healthcare",
  },
  {
    highlight: "It was like magic — they took an idea from my head and made it a reality.",
    quote: "The Databender team took an idea from my head and made it a reality. As a non-technical person, it was like magic to be able to communicate my vision in plain English and have it turned into a database with products built on top to manipulate the insights found. The attention to detail and emphasis on carrying out my vision instead of opting for simpler, less effective strategies made me feel that they were truly trying to create something with me rather than for me. The team kept in constant communication with me, asking for my input throughout the entirety of the project. This was essential — they would provide me with test-runs so that I could give real-time feedback to ensure that what they delivered in the end was exactly what I needed. I look forward to working with them again in the future, and would encourage anyone reading this to let them take your idea and bring it to life!",
    name: "Reid Valentine",
    title: "Landman",
    company: "707 Advisors LLC",
    industry: "Energy",
  },
  {
    highlight: "Outstanding data experts who surpassed all my expectations.",
    quote: "I had the privilege of working with Databender, outstanding data experts who surpassed all my expectations. Despite a large task and limited time, their expertise and efficient work approach allowed for timely completion. Their attention to detail, problem-solving skills, and ability to transform complex data into meaningful insights were remarkable. Communication was seamless, and their professionalism instilled confidence in their abilities. I highly recommend Databender for their exceptional skills, dedication, and 5-star performance!",
    name: "Austin Mault",
    title: "Principal",
    company: "Hoosier OsteoTronix",
    industry: "Healthcare",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function filterCaseStudies(
  industry?: string,
  challenge?: string,
  service?: string
): CaseStudy[] {
  return caseStudies.filter((cs) => {
    const matchesIndustry = !industry || industry === "All Industries" || cs.industryCategory === industry || cs.industry === industry;
    const matchesChallenge = !challenge || challenge === "All Challenges" || cs.challengeType === challenge;
    const matchesService = !service || service === "All Services" || cs.services.some((s) => s.includes(service.replace(" & ", " ")));
    return matchesIndustry && matchesChallenge && matchesService;
  });
}
