"use client";

import Link from "next/link";

interface ActionCardsProps {
  data: {
    hotLeadsToContact: number;
    newToday: number;
    needFollowUp: number;
    companiesToResearch: number;
  };
}

export default function ActionCards({ data }: ActionCardsProps) {
  const cards = [
    {
      label: "Hot Leads to Contact",
      value: data.hotLeadsToContact,
      color: "bg-red-500",
      href: "/admin/leads?tier=A&contactStatus=not_contacted",
      description: "High-scoring, not yet contacted",
    },
    {
      label: "New Today",
      value: data.newToday,
      color: "bg-teal-500",
      href: "/admin/leads?status=new",
      description: "Fresh leads to review",
    },
    {
      label: "Need Follow-up",
      value: data.needFollowUp,
      color: "bg-amber-500",
      href: "/admin/leads?status=contacted",
      description: "Contacted but no response",
    },
    {
      label: "Companies to Research",
      value: data.companiesToResearch,
      color: "bg-purple-500",
      href: "/admin/analytics#companies",
      description: "Identified but no lead yet",
    },
  ];

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎯</span>
        <h2 className="text-lg font-semibold text-text-primary">Action Required</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group block p-4 rounded-lg border border-border hover:border-teal-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`w-2 h-2 rounded-full ${card.color}`}></span>
              <span className="text-3xl font-bold text-text-primary group-hover:text-teal-500 transition-colors">
                {card.value}
              </span>
            </div>
            <p className="text-sm font-medium text-text-primary">{card.label}</p>
            <p className="text-xs text-text-muted mt-1">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
