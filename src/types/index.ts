// Service types
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  category: "data-ai-strategy" | "analytics-bi" | "ai-services" | "custom-software";
  isFlagship?: boolean;
}

// Industry types
export interface Industry {
  slug: string;
  title: string;
  description: string;
  icon: string;
  lottie?: string;
  subIndustries?: SubIndustry[];
}

export interface SubIndustry {
  slug: string;
  title: string;
  description: string;
  parentSlug: string;
}

// Case Study types
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial?: Testimonial;
  featured?: boolean;
}

export interface CaseStudyResult {
  metric: string;
  value: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// Assessment types
export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  question: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  value: number;
  label: string;
  description?: string;
}

export type AssessmentCategory =
  | "dataInfrastructure"
  | "analyticsCapability"
  | "automationMaturity"
  | "aiReadiness";

export interface AssessmentScores {
  dataInfrastructure: number;
  analyticsCapability: number;
  automationMaturity: number;
  aiReadiness: number;
  total: number;
  tier: "early" | "emerging" | "developing" | "advanced";
}

export interface AssessmentSubmission {
  answers: Record<string, number>;
  scores: AssessmentScores;
  contact: ContactInfo;
  submittedAt: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Blog types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  featuredImage?: string;
}

// Component props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "teal" | "outline";
  size?: "sm" | "md";
  className?: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}
