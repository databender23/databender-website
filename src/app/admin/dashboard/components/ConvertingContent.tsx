"use client";

interface ConvertingContentProps {
  data: Array<{
    page: string;
    leads: number;
    conversionRate: number;
  }>;
}

function formatPageName(page: string): string {
  // Clean up the page path for display
  const cleaned = page
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .split("/")
    .pop() || page;

  // Capitalize first letter of each word
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ConvertingContent({ data }: ConvertingContentProps) {
  if (data.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          📄 Top Converting Pages
        </h2>
        <p className="text-text-muted text-sm">
          No conversion data yet. Leads will show which pages convert best.
        </p>
      </div>
    );
  }

  const maxLeads = Math.max(...data.map((d) => d.leads), 1);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        📄 Top Converting Pages
      </h2>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => (
          <div key={item.page} className="flex items-center gap-3">
            <span className="text-sm text-text-muted w-5">{index + 1}.</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary truncate max-w-[180px]">
                  {formatPageName(item.page)}
                </span>
                <span className="text-sm font-bold text-teal-600">
                  {item.leads} leads
                </span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all"
                  style={{ width: `${(item.leads / maxLeads) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-sm text-text-muted text-center py-4">
          No conversion data available yet
        </p>
      )}
    </div>
  );
}
