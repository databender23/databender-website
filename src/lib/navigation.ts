import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Data & AI Strategy", href: "/services/data-ai-strategy" },
      { label: "Analytics & BI", href: "/services/analytics-bi" },
      { label: "AI & Automation", href: "/services/ai-services" },
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
      { label: "Assessments", href: "/assessments" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/our-process" },
    ],
  },
];

export const footerNavigation = {
  services: [
    { label: "Data & AI Strategy", href: "/services/data-ai-strategy" },
    { label: "Analytics & BI", href: "/services/analytics-bi" },
    { label: "AI & Automation", href: "/services/ai-services" },
    { label: "All Services", href: "/services" },
  ],
  industries: [
    { label: "Legal", href: "/industries/legal" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Assessments", href: "/assessments" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Our Process", href: "/our-process" },
    { label: "Contact", href: "/contact" },
  ],
};
