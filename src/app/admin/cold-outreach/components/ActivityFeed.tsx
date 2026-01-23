"use client";

interface ActivityItem {
  id: string;
  timestamp: string;
  email: string;
  type: "open" | "click" | "reply" | "bounce" | "complaint" | "sent";
  emailDay: number;
  sequenceType: string;
  url?: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatSequence(sequenceType: string): string {
  const names: Record<string, string> = {
    "cold-legal": "Legal",
    "cold-manufacturing": "Manufacturing",
    "cold-healthcare": "Healthcare",
    "cold-cre": "CRE",
  };
  return names[sequenceType] || sequenceType;
}

function getTypeStyles(type: string): { bg: string; text: string; icon: string } {
  switch (type) {
    case "open":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      };
    case "click":
      return {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
      };
    case "reply":
      return {
        bg: "bg-teal-100",
        text: "text-teal-800",
        icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6",
      };
    case "bounce":
      return {
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      };
    case "complaint":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      };
    case "sent":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      };
  }
}

function getActionText(item: ActivityItem): string {
  switch (item.type) {
    case "open":
      return `opened Day ${item.emailDay} email`;
    case "click":
      return `clicked link in Day ${item.emailDay} email`;
    case "reply":
      return `replied to Day ${item.emailDay} email`;
    case "bounce":
      return `bounced on Day ${item.emailDay} email`;
    case "complaint":
      return `marked Day ${item.emailDay} email as spam`;
    case "sent":
      return `received Day ${item.emailDay} email`;
    default:
      return `activity on Day ${item.emailDay}`;
  }
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Recent Activity
        </h2>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <p className="text-sm text-text-muted">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Recent Activity
      </h2>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.map((item) => {
          const styles = getTypeStyles(item.type);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary/50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg ${styles.bg} flex items-center justify-center flex-shrink-0`}
              >
                <svg
                  className={`w-4 h-4 ${styles.text}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={styles.icon}
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium truncate">{item.email}</span>{" "}
                  <span className="text-text-muted">{getActionText(item)}</span>
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {formatTime(item.timestamp)} - {formatSequence(item.sequenceType)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
