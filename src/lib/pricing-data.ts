export interface EngagementType {
  name: string;
  duration: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export const engagementTypes: EngagementType[] = [
  {
    name: "Discovery Sprint",
    duration: "2-4 weeks",
    description: "Assess your current state, identify quick wins, and map out the path forward.",
    deliverables: [
      "Current state assessment",
      "Opportunity identification",
      "Prioritized roadmap",
      "Quick-win recommendations",
    ],
    idealFor: "Companies ready to explore AI/data opportunities but unsure where to start.",
  },
  {
    name: "Implementation",
    duration: "4-12 weeks",
    description: "Build and deploy a specific solution: a custom application, AI tool, or data pipeline.",
    deliverables: [
      "Custom-built solution",
      "Integration with your systems",
      "Team training",
      "Documentation",
    ],
    idealFor: "Organizations with a clear use case ready to move forward.",
  },
  {
    name: "Managed Services",
    duration: "Monthly",
    description: "Ongoing support, optimization, and expansion of your data and AI capabilities.",
    deliverables: [
      "Continuous monitoring",
      "Performance optimization",
      "Feature enhancements",
      "Priority support",
    ],
    idealFor: "Companies that want expert oversight without building an internal team.",
  },
];

export function getEngagementTypes(): EngagementType[] {
  return engagementTypes;
}
