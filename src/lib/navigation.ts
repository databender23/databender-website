import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Data & AI Strategy", href: "/services/data-ai-strategy" },
      { label: "Analytics & BI", href: "/services/analytics-bi" },
      { label: "AI Services", href: "/services/ai-services" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Legal", href: "/industries/legal" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Data & AI Readiness Assessment", href: "/assessments/data-ai-readiness" },
      { label: "Manufacturing Assessment", href: "/assessments/manufacturing" },
      { label: "Healthcare Benchmark", href: "/assessments/healthcare-benchmark" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const footerNavigation = {
  services: [
    { label: "Data & AI Strategy", href: "/services/data-ai-strategy" },
    { label: "Analytics & BI", href: "/services/analytics-bi" },
    { label: "AI Services", href: "/services/ai-services" },
    { label: "All Services", href: "/services" },
  ],
  industries: [
    { label: "Legal", href: "/industries/legal" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
  ],
  resources: [
    { label: "Data & AI Assessment", href: "/assessments/data-ai-readiness" },
    { label: "Manufacturing Assessment", href: "/assessments/manufacturing" },
    { label: "Healthcare Benchmark", href: "/assessments/healthcare-benchmark" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
