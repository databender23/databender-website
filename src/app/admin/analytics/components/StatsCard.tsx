interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, subtitle, trend }: StatsCardProps) {
  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border card-hover">
      <p className="text-sm text-text-muted font-medium">{title}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold text-text-primary">{value}</span>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? "text-success" : "text-error"
            }`}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
    </div>
  );
}
