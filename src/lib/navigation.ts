import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Get Clarity", href: "/services/data-ai-strategy" },
      { label: "See What's Happening", href: "/services/analytics-bi" },
      { label: "Put AI to Work", href: "/services/ai-services" },
      { label: "Build What You Need", href: "/services/custom-software" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Construction", href: "/industries/construction" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Wholesale Distribution", href: "/industries/wholesale-distribution" },
      { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
      { label: "Legal", href: "/industries/legal" },
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
    { label: "Get Clarity", href: "/services/data-ai-strategy" },
    { label: "See What's Happening", href: "/services/analytics-bi" },
    { label: "Put AI to Work", href: "/services/ai-services" },
    { label: "Build What You Need", href: "/services/custom-software" },
  ],
  industries: [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Construction", href: "/industries/construction" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
    { label: "Wholesale Distribution", href: "/industries/wholesale-distribution" },
    { label: "Commercial Real Estate", href: "/industries/commercial-real-estate" },
    { label: "Legal", href: "/industries/legal" },
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
