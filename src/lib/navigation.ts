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
      { label: "Professional Services", href: "/industries/professional-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
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
    { label: "Professional Services", href: "/industries/professional-services" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Assessment", href: "/assessments/data-ai-readiness" },
  ],
};
