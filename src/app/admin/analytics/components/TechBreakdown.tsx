interface TechBreakdownProps {
  browserData: Record<string, number>;
  osData: Record<string, number>;
}

export default function TechBreakdown({ browserData, osData }: TechBreakdownProps) {
  const browsers = Object.entries(browserData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const operatingSystems = Object.entries(osData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const browserTotal = browsers.reduce((sum, [, count]) => sum + count, 0);
  const osTotal = operatingSystems.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Technology</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Browsers */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Browsers</h4>
          {browsers.length === 0 ? (
            <p className="text-text-muted text-sm">No data</p>
          ) : (
            <div className="space-y-2">
              {browsers.map(([browser, count]) => (
                <div key={browser} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{browser}</span>
                  <span className="text-sm text-text-muted">
                    {browserTotal > 0 ? Math.round((count / browserTotal) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Operating Systems */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">Operating Systems</h4>
          {operatingSystems.length === 0 ? (
            <p className="text-text-muted text-sm">No data</p>
          ) : (
            <div className="space-y-2">
              {operatingSystems.map(([os, count]) => (
                <div key={os} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{os}</span>
                  <span className="text-sm text-text-muted">
                    {osTotal > 0 ? Math.round((count / osTotal) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
