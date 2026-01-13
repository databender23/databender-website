interface TopPagesTableProps {
  data: { page: string; count: number; avgTime?: number }[];
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

export default function TopPagesTable({ data }: TopPagesTableProps) {
  const maxCount = data[0]?.count || 1;

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Top Pages</h3>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-text-muted text-sm">No data available</p>
        ) : (
          data.map((item, index) => (
            <div key={item.page} className="flex items-center gap-3">
              <span className="text-sm text-text-muted w-6">{index + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary font-medium truncate max-w-[180px]">
                    {item.page}
                  </span>
                  <div className="flex items-center gap-3">
                    {item.avgTime !== undefined && item.avgTime > 0 && (
                      <span className="text-xs text-text-muted">{formatTime(item.avgTime)}</span>
                    )}
                    <span className="text-sm text-text-muted">{item.count}</span>
                  </div>
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
