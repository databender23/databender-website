interface LocationBreakdownProps {
  data: { country: string; count: number }[];
}

export default function LocationBreakdown({ data }: LocationBreakdownProps) {
  const maxCount = data[0]?.count || 1;

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Top Countries</h3>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-text-muted text-sm">No data available</p>
        ) : (
          data.map((item, index) => (
            <div key={item.country} className="flex items-center gap-3">
              <span className="text-sm text-text-muted w-6">{index + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary font-medium">
                    {item.country}
                  </span>
                  <span className="text-sm text-text-muted">{item.count}</span>
                </div>
                <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
