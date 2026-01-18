export interface TeamMember {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  photo?: string;
  linkedIn?: string;
  serviceExpertise?: string[]; // Service slugs this expert specializes in
}

export const teamMembers: TeamMember[] = [
  {
    name: "Grant Bender",
    title: "Founder & Principal",
    credentials: [
      "Former analytics leader at Fortune 500",
      "10+ years in data strategy & AI",
      "Expert in AWS, Python, and modern data stack",
    ],
    bio: "Grant founded Databender to help growing companies access the same data and AI capabilities that large enterprises take for granted, without the enterprise price tag or timeline.",
    photo: "/images/team/grant-bender.jpg",
    linkedIn: "https://linkedin.com/in/grantbender",
    serviceExpertise: ["data-ai-strategy", "analytics-bi", "ai-services"],
  },
];

export function getTeamMemberByName(name: string): TeamMember | undefined {
  return teamMembers.find((member) => member.name === name);
}

export function getTeamMembersByService(serviceSlug: string): TeamMember[] {
  return teamMembers.filter(
    (member) => member.serviceExpertise?.includes(serviceSlug)
  );
}

export function getPrimaryExpert(): TeamMember {
  return teamMembers[0];
}
