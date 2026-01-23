"use client";

interface SequenceData {
  sequenceType: string;
  enrolled: number;
  metrics: {
    day0: { sent: number; opened: number; clicked: number };
    day2: { sent: number; opened: number; clicked: number };
    day7: { sent: number; opened: number; clicked: number };
    day14: { sent: number; opened: number; clicked: number };
    day21: { sent: number; opened: number; clicked: number };
    replies: number;
  };
}

interface SequenceTableProps {
  data: SequenceData[];
}

function formatSequenceName(sequenceType: string): string {
  const names: Record<string, string> = {
    "cold-legal": "Legal",
    "cold-manufacturing": "Manufacturing",
    "cold-healthcare": "Healthcare",
    "cold-cre": "Commercial Real Estate",
  };
  return names[sequenceType] || sequenceType;
}

function calcOpenRate(opened: number, sent: number): string {
  if (sent === 0) return "-";
  return `${((opened / sent) * 100).toFixed(0)}%`;
}

export default function SequenceTable({ data }: SequenceTableProps) {
  // Filter to only cold sequences
  const coldSequences = data.filter((s) => s.sequenceType.startsWith("cold-"));

  if (coldSequences.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Sequence Performance
        </h2>
        <p className="text-text-muted text-sm">
          No cold outreach sequences have been sent yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Sequence Performance
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-text-muted">
                Sequence
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Enrolled
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 0 Sent
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 0 Open %
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 2 Sent
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 2 Open %
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 7 Sent
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Day 7 Open %
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Replies
              </th>
              <th className="text-right py-3 px-2 font-medium text-text-muted">
                Reply Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {coldSequences.map((seq) => {
              const replyRate =
                seq.enrolled > 0
                  ? ((seq.metrics.replies / seq.enrolled) * 100).toFixed(1)
                  : "0";

              return (
                <tr
                  key={seq.sequenceType}
                  className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-2 font-medium text-text-primary">
                    {formatSequenceName(seq.sequenceType)}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {seq.enrolled}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {seq.metrics.day0.sent}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {calcOpenRate(seq.metrics.day0.opened, seq.metrics.day0.sent)}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {seq.metrics.day2.sent}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {calcOpenRate(seq.metrics.day2.opened, seq.metrics.day2.sent)}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {seq.metrics.day7.sent}
                  </td>
                  <td className="py-3 px-2 text-right text-text-secondary">
                    {calcOpenRate(seq.metrics.day7.opened, seq.metrics.day7.sent)}
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-teal-600">
                    {seq.metrics.replies}
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-teal-600">
                    {replyRate}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
