"use client";

interface OverviewCardsProps {
  data: {
    sent: number;
    delivered: number;
    deliveredRate: number;
    opened: number;
    openedRate: number;
    clicked: number;
    clickedRate: number;
    replied: number;
    repliedRate: number;
    bounced: number;
    bouncedRate: number;
    complained: number;
    complainedRate: number;
    unsubscribed: number;
    unsubscribedRate: number;
  };
}

interface MetricCard {
  label: string;
  value: number;
  rate: number;
  color: string;
  isPositive: boolean;
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const row1: MetricCard[] = [
    {
      label: "Sent",
      value: data.sent,
      rate: 100,
      color: "bg-blue-500",
      isPositive: true,
    },
    {
      label: "Delivered",
      value: data.delivered,
      rate: data.deliveredRate,
      color: "bg-teal-500",
      isPositive: true,
    },
    {
      label: "Opened",
      value: data.opened,
      rate: data.openedRate,
      color: "bg-green-500",
      isPositive: true,
    },
    {
      label: "Clicked",
      value: data.clicked,
      rate: data.clickedRate,
      color: "bg-purple-500",
      isPositive: true,
    },
  ];

  const row2: MetricCard[] = [
    {
      label: "Replied",
      value: data.replied,
      rate: data.repliedRate,
      color: "bg-emerald-500",
      isPositive: true,
    },
    {
      label: "Bounced",
      value: data.bounced,
      rate: data.bouncedRate,
      color: "bg-orange-500",
      isPositive: false,
    },
    {
      label: "Complained",
      value: data.complained,
      rate: data.complainedRate,
      color: "bg-red-500",
      isPositive: false,
    },
    {
      label: "Unsubscribed",
      value: data.unsubscribed,
      rate: data.unsubscribedRate,
      color: "bg-gray-500",
      isPositive: false,
    },
  ];

  const renderCard = (card: MetricCard) => (
    <div
      key={card.label}
      className="bg-bg-card rounded-lg p-4 shadow-card border border-border"
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`w-2 h-2 rounded-full ${card.color}`}></span>
        <span className="text-2xl font-bold text-text-primary">
          {card.value.toLocaleString()}
        </span>
      </div>
      <p className="text-sm font-medium text-text-primary">{card.label}</p>
      <p
        className={`text-xs mt-1 ${
          card.isPositive ? "text-text-muted" : card.rate > 0 ? "text-orange-600" : "text-text-muted"
        }`}
      >
        {card.label === "Sent" ? "-" : `${card.rate.toFixed(1)}%`}
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {row1.map(renderCard)}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {row2.map(renderCard)}
      </div>
    </div>
  );
}
