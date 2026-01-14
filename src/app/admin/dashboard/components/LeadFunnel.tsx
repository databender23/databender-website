"use client";

interface FunnelData {
  visitors: number;
  identifiedCompanies: number;
  leads: number;
  contacted: number;
  qualified: number;
  customers: number;
}

interface LeadFunnelProps {
  data: FunnelData;
  period: number;
}

function formatRate(from: number, to: number): string {
  if (from === 0) return "0%";
  return `${Math.round((to / from) * 100)}%`;
}

export default function LeadFunnel({ data, period }: LeadFunnelProps) {
  const stages = [
    { label: "Visitors", value: data.visitors, color: "bg-gray-400" },
    { label: "Identified", value: data.identifiedCompanies, color: "bg-purple-500" },
    { label: "Leads", value: data.leads, color: "bg-blue-500" },
    { label: "Contacted", value: data.contacted, color: "bg-amber-500" },
    { label: "Qualified", value: data.qualified, color: "bg-teal-500" },
    { label: "Customers", value: data.customers, color: "bg-green-500" },
  ];

  const maxValue = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">
          📊 Lead Generation Funnel
        </h2>
        <span className="text-sm text-text-muted">Last {period} days</span>
      </div>

      {/* Visual funnel */}
      <div className="space-y-3 mb-6">
        {stages.map((stage, index) => {
          const width = Math.max((stage.value / maxValue) * 100, 5);
          const prevValue = index > 0 ? stages[index - 1].value : 0;
          const rate = index > 0 ? formatRate(prevValue, stage.value) : "";

          return (
            <div key={stage.label} className="flex items-center gap-4">
              <div className="w-24 text-sm text-text-secondary text-right">
                {stage.label}
              </div>
              <div className="flex-1 h-8 bg-bg-secondary rounded-lg overflow-hidden relative">
                <div
                  className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-end pr-3`}
                  style={{ width: `${width}%` }}
                >
                  <span className="text-white text-sm font-medium">
                    {stage.value.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-12 text-sm text-text-muted text-right">
                {rate}
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion rates summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-purple-600">
            {formatRate(data.visitors, data.identifiedCompanies)}
          </p>
          <p className="text-xs text-text-muted">ID Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">
            {formatRate(data.identifiedCompanies || data.visitors, data.leads)}
          </p>
          <p className="text-xs text-text-muted">Lead Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-600">
            {formatRate(data.leads, data.contacted)}
          </p>
          <p className="text-xs text-text-muted">Contact Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">
            {formatRate(data.contacted, data.qualified)}
          </p>
          <p className="text-xs text-text-muted">Qualify Rate</p>
        </div>
      </div>
    </div>
  );
}
