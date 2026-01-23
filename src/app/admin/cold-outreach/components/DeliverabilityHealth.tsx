"use client";

interface DeliverabilityHealthProps {
  data: {
    delivered: number;
    deliveredRate: number;
    bounced: number;
    bouncedRate: number;
    complained: number;
    complainedRate: number;
    opened: number;
    openedRate: number;
  };
}

interface HealthMetric {
  metric: string;
  current: number;
  target: string;
  status: "good" | "warning" | "bad";
}

function getStatus(metric: string, value: number): "good" | "warning" | "bad" {
  switch (metric) {
    case "Delivery Rate":
      if (value >= 95) return "good";
      if (value >= 90) return "warning";
      return "bad";
    case "Bounce Rate":
      if (value <= 2) return "good";
      if (value <= 5) return "warning";
      return "bad";
    case "Complaint Rate":
      if (value <= 0.1) return "good";
      if (value <= 0.3) return "warning";
      return "bad";
    case "Open Rate":
      if (value >= 40) return "good";
      if (value >= 25) return "warning";
      return "bad";
    default:
      return "good";
  }
}

function StatusIcon({ status }: { status: "good" | "warning" | "bad" }) {
  if (status === "good") {
    return (
      <svg
        className="w-5 h-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (status === "warning") {
    return (
      <svg
        className="w-5 h-5 text-amber-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-5 h-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function DeliverabilityHealth({ data }: DeliverabilityHealthProps) {
  const metrics: HealthMetric[] = [
    {
      metric: "Delivery Rate",
      current: data.deliveredRate,
      target: ">95%",
      status: getStatus("Delivery Rate", data.deliveredRate),
    },
    {
      metric: "Bounce Rate",
      current: data.bouncedRate,
      target: "<2%",
      status: getStatus("Bounce Rate", data.bouncedRate),
    },
    {
      metric: "Complaint Rate",
      current: data.complainedRate,
      target: "<0.1%",
      status: getStatus("Complaint Rate", data.complainedRate),
    },
    {
      metric: "Open Rate",
      current: data.openedRate,
      target: ">40%",
      status: getStatus("Open Rate", data.openedRate),
    },
  ];

  const overallHealth =
    metrics.filter((m) => m.status === "good").length === 4
      ? "good"
      : metrics.some((m) => m.status === "bad")
      ? "bad"
      : "warning";

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Deliverability Health
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            overallHealth === "good"
              ? "bg-green-100 text-green-800"
              : overallHealth === "warning"
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {overallHealth === "good"
            ? "Healthy"
            : overallHealth === "warning"
            ? "Attention Needed"
            : "Issues Detected"}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-text-muted">
                Metric
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Current
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Target
              </th>
              <th className="text-center py-3 px-2 font-medium text-text-muted">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => (
              <tr
                key={m.metric}
                className="border-b border-border last:border-0"
              >
                <td className="py-3 px-2 font-medium text-text-primary">
                  {m.metric}
                </td>
                <td className="py-3 px-2 text-right text-text-secondary">
                  {m.current.toFixed(1)}%
                </td>
                <td className="py-3 px-2 text-right text-text-muted">
                  {m.target}
                </td>
                <td className="py-3 px-2">
                  <div className="flex justify-center">
                    <StatusIcon status={m.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
