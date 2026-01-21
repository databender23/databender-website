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
  diagramType?: 'entity-resolution' | 'lead-scoring' | 'document-intelligence';
  heroMetric?: {
    value: string;
    label: string;
    comparison?: {
      before: string;
      after: string;
    };
  };
}

export interface Testimonial {
  highlight: string;
  quote: string;
  name: string;
  title: string;
  company?: string;
  industry: string;
  services?: string[]; // Service slugs this testimonial relates to
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
  "Custom Applications & Analytics",
  "AI & Automation",
  "Predictive Analytics",
  "Document Intelligence",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "army-of-ai-agents",
    title: "An Army of AI Agents vs. 1.69M Broken Records",
    client: "Energy Sector Client",
    industry: "Energy",
    industryCategory: "Energy",
    services: ["AI Data Cleanup", "Data Integration"],
    challengeType: "Data Quality",
    challengeBrief: "Offers going to wrong people. Competitors reaching real owners first. A data problem that would take 50 analysts months to fix.",
    challenge: "A mineral rights company had 1.69 million ownership records with broken IDs. The same ID was assigned to 670 different people, and the same person was scattered across multiple IDs. Manual review would take months. Accuracy was critical for legal and financial decisions.",
    solution: "We deployed an army of AI agents that reason through data chaos like humans do, but at machine scale. 10 agents processing in parallel, understanding that 'Miller, John' and 'John Miller' are the same person without being told.",
    approach: [
      "Identified broken data patterns: collision IDs, unstable IDs, duplicates",
      "Deployed 10 AI agents reasoning through matches in parallel",
      "Processed 1.69M records with human-level reasoning at machine speed",
      "Validated every decision with documented reasoning",
      "Delivered in hours what would take 50 analysts months",
    ],
    results: [
      { value: 99, suffix: "%", label: "Cost reduction vs manual" },
      { value: 1.25, suffix: "M", label: "Unique owners identified" },
      { value: 10, label: "AI agents deployed" },
      { value: 100, suffix: "%", label: "Decisions documented" },
    ],
    resultHighlight: "From $25K to under $500",
    quote: "Before this, we were sending four mailers to the same person and missing actual property owners entirely. Now we know exactly who owns what before we reach out.",
    images: [
      "/images/case-studies/entity-resolution-1-1.png",
      "/images/case-studies/entity-resolution-2-1.png",
    ],
    thumbnail: "/images/case-studies/entity-resolution-1-1.png",
    featured: true,
    diagramType: 'entity-resolution',
    heroMetric: {
      value: '$25K→$200',
      label: 'Cost Reduction',
      comparison: {
        before: '$25,000',
        after: '$200',
      },
    },
  },
  {
    slug: "what-predicts-lead-conversion",
    title: "What Actually Predicts Lead Conversion?",
    client: "Home Services Company",
    industry: "Home Services",
    industryCategory: "Home Services",
    services: ["AI Insights", "Predictive Analytics"],
    challengeType: "AI/Automation",
    challengeBrief: "3 years of sales data revealed surprising patterns about what makes leads convert.",
    challenge: "Sales teams often assume that wealthier prospects make better leads. We analyzed 3 years of actual conversion data to test this assumption, and found the opposite.",
    solution: "By training models on real outcomes instead of assumptions, we discovered that intent signals (urgency, financial capacity) outperform engagement metrics. Property value was actually a negative predictor.",
    approach: [
      "Analyzed 3 years of historical conversion data",
      "Tested common assumptions against actual outcomes",
      "Discovered urgency and financial capacity outperform property value",
      "Built scoring around intent signals instead of engagement metrics",
      "Achieved 31% higher success rate vs. standard CRM scoring",
    ],
    results: [
      { value: 31, suffix: "%", label: "Higher success rate vs. Salesforce" },
      { value: 3, label: "Years of data analyzed" },
      { value: 7, label: "Key predictors identified" },
      { value: 1, prefix: "#", label: "Predictor: Project urgency" },
    ],
    resultHighlight: "31% higher success rate",
    quote: "The data showed property value was a negative predictor. What actually matters: urgency, financial capacity, and local success history.",
    images: [
      "/images/case-studies/lead-scoring-1-1.png",
      "/images/case-studies/lead-scoring-2-1.png",
    ],
    thumbnail: "/images/case-studies/lead-scoring-1-1.png",
    featured: true,
    diagramType: 'lead-scoring',
    heroMetric: {
      value: '31%',
      label: 'Higher Success Rate',
    },
  },
  {
    slug: "agentic-document-intelligence",
    title: "Document Intelligence: AI That Knows Your Business",
    client: "Medical Device Distributor",
    industry: "Healthcare",
    industryCategory: "Healthcare & Dental",
    services: ["AI & Automation", "Document Intelligence"],
    challengeType: "AI/Automation",
    challengeBrief: "Years of institutional knowledge locked in documents AI couldn't access.",
    challenge: "A medical device distributor had decades of product knowledge scattered across thousands of documents from 70+ manufacturers. Every question meant digging through PDFs manually. AI tools like ChatGPT couldn't help because they couldn't access any of this institutional knowledge.",
    solution: "We built Document Intelligence that transforms unstructured documents into an AI-ready knowledge base. Now AI can search, answer questions, power applications, and automate workflows, all using the organization's own data.",
    approach: [
      "AI reads and understands documents like humans do, with no custom rules per format",
      "Transforms scattered documents into a unified, searchable knowledge base",
      "Enables AI-powered search: ask questions in plain English, get instant answers",
      "Powers custom applications like mobile apps, analytics tools, and chatbots",
      "New documents automatically expand what AI knows, creating a living knowledge base",
    ],
    results: [
      { value: 1000, suffix: "s", label: "Documents captured" },
      { value: 70, suffix: "+", label: "Formats supported" },
      { value: 2, suffix: "sec", label: "Average answer time" },
      { value: 24, suffix: "/7", label: "AI availability" },
    ],
    resultHighlight: "Instant AI access to institutional knowledge",
    quote: "For the first time, we can ask AI questions about our own data. Twenty years of product knowledge, instantly accessible.",
    images: [
      "/images/case-studies/document-intelligence-1.png",
      "/images/case-studies/document-intelligence-2.png",
    ],
    thumbnail: "/images/case-studies/document-intelligence-1.png",
    featured: true,
    diagramType: 'document-intelligence',
    heroMetric: {
      value: 'Instant',
      label: 'AI Answers',
    },
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
    services: ["data-ai-strategy", "analytics-bi"],
  },
  {
    highlight: "Technically sound, scalable, well-documented, and aligned with best practices.",
    quote: "We engaged Databender to develop a system that processes large amounts of data sourced from a variety of formats. One of their standout qualities was an ability to translate our high-level requirements into a well-structured, modular architecture that effectively manages process transitions in accordance with our business requirements. They expertly mapped dependencies and optimized data flows with both performance and maintainability in mind. Their technical expertise in designing and implementing robust system architectures produced a work product that is not only technically sound but scalable, well-documented and aligned with industry best practices. Because of their deep technical skills and flawless execution, I would recommend them without hesitation to anyone seeking a team who can handle complex systems work with precision, transparency, and professionalism.",
    name: "Jay Williamson",
    title: "Founder",
    company: "Health Price Compare",
    industry: "Healthcare",
    services: ["data-ai-strategy", "ai-services"],
  },
  {
    highlight: "It was like magic — they took an idea from my head and made it a reality.",
    quote: "The Databender team took an idea from my head and made it a reality. As a non-technical person, it was like magic to be able to communicate my vision in plain English and have it turned into a database with products built on top to manipulate the insights found. The attention to detail and emphasis on carrying out my vision instead of opting for simpler, less effective strategies made me feel that they were truly trying to create something with me rather than for me. The team kept in constant communication with me, asking for my input throughout the entirety of the project. This was essential — they would provide me with test-runs so that I could give real-time feedback to ensure that what they delivered in the end was exactly what I needed. I look forward to working with them again in the future, and would encourage anyone reading this to let them take your idea and bring it to life!",
    name: "Reid Valentine",
    title: "Landman",
    company: "707 Advisors LLC",
    industry: "Energy",
    services: ["data-ai-strategy", "analytics-bi", "ai-services"],
  },
  {
    highlight: "Outstanding data experts who surpassed all my expectations.",
    quote: "I had the privilege of working with Databender, outstanding data experts who surpassed all my expectations. Despite a large task and limited time, their expertise and efficient work approach allowed for timely completion. Their attention to detail, problem-solving skills, and ability to transform complex data into meaningful insights were remarkable. Communication was seamless, and their professionalism instilled confidence in their abilities. I highly recommend Databender for their exceptional skills, dedication, and 5-star performance!",
    name: "Austin Mault",
    title: "Principal",
    company: "Hoosier OsteoTronix",
    industry: "Healthcare",
    services: ["analytics-bi", "ai-services"],
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

export function getTestimonialsByService(serviceSlug: string): Testimonial[] {
  return testimonials.filter(
    (t) => t.services && t.services.includes(serviceSlug)
  );
}
