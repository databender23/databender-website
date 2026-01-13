/**
 * Daily Email Summary Service
 *
 * Generates and sends daily analytics digest including:
 * - Traffic overview
 * - Lead score breakdown
 * - Identified companies
 * - Top converting content
 * - Follow-up recommendations
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getEventsForDateRange, getSessionsForDateRange, getConversionPathsForDateRange } from "@/lib/analytics/dynamodb";
import type { TrackedEvent, Session, ConversionPath } from "@/lib/analytics/events";

const SES_REGION = process.env.SES_REGION || "us-east-1";
const FROM_EMAIL = process.env.SES_FROM_EMAIL || "analytics@databender.co";
const SUMMARY_EMAIL = process.env.ANALYTICS_SUMMARY_EMAIL || process.env.CHAT_NOTIFY_EMAIL;

interface DailySummary {
  date: string;
  traffic: {
    pageviews: number;
    uniqueVisitors: number;
    sessions: number;
    avgSessionDuration: number;
    bounceRate: number;
    vsLastWeekAvg: number; // percentage change
  };
  leads: {
    veryHot: number;
    hot: number;
    warm: number;
    cold: number;
    total: number;
  };
  companies: {
    name: string;
    domain?: string;
    visits: number;
    pagesViewed: string[];
    leadScore: number;
    lastSeen: string;
  }[];
  conversions: {
    total: number;
    byType: Record<string, number>;
    topConvertingPages: { page: string; conversions: number }[];
  };
  topContent: {
    page: string;
    views: number;
    avgTime: number;
    conversions: number;
  }[];
  followUps: string[];
}

function getDateString(daysAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

export async function generateDailySummary(): Promise<DailySummary> {
  const yesterday = getDateString(1);
  const weekAgo = getDateString(7);

  // Fetch data for yesterday
  const [events, sessions] = await Promise.all([
    getEventsForDateRange(yesterday, yesterday),
    getSessionsForDateRange(yesterday, yesterday),
  ]);

  // Fetch last 7 days for comparison
  const [weekEvents] = await Promise.all([
    getEventsForDateRange(weekAgo, getDateString(1)),
  ]);

  // Filter human traffic
  const humanEvents = events.filter(e => !e.isBot);
  const humanSessions = sessions;

  // Calculate traffic metrics
  const pageviews = humanEvents.filter(e => e.eventType === "pageview").length;
  const uniqueVisitors = new Set(humanEvents.map(e => e.visitorId)).size;
  const totalSessions = humanSessions.length;

  // Session duration
  const sessionsWithDuration = humanSessions.filter(s => s.duration && s.duration > 0);
  const avgSessionDuration = sessionsWithDuration.length > 0
    ? Math.round(sessionsWithDuration.reduce((sum, s) => sum + (s.duration || 0), 0) / sessionsWithDuration.length)
    : 0;

  // Bounce rate
  const sessionPageCounts: Record<string, number> = {};
  humanEvents.filter(e => e.eventType === "pageview").forEach(e => {
    sessionPageCounts[e.sessionId] = (sessionPageCounts[e.sessionId] || 0) + 1;
  });
  const bouncedSessions = Object.values(sessionPageCounts).filter(c => c === 1).length;
  const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;

  // Weekly comparison
  const weekPageviews = weekEvents.filter(e => !e.isBot && e.eventType === "pageview").length;
  const weekAvgDaily = weekPageviews / 7;
  const vsLastWeekAvg = weekAvgDaily > 0 ? ((pageviews - weekAvgDaily) / weekAvgDaily) * 100 : 0;

  // Lead score breakdown
  const leadCounts = { veryHot: 0, hot: 0, warm: 0, cold: 0 };
  humanSessions.forEach(s => {
    const score = s.leadScore || 0;
    if (score >= 76) leadCounts.veryHot++;
    else if (score >= 50) leadCounts.hot++;
    else if (score >= 26) leadCounts.warm++;
    else leadCounts.cold++;
  });

  // Identified companies
  const companyMap = new Map<string, {
    domain?: string;
    visits: number;
    pages: Set<string>;
    leadScore: number;
    lastSeen: string;
  }>();

  humanSessions.forEach(s => {
    if (s.companyName) {
      const existing = companyMap.get(s.companyName);
      if (existing) {
        existing.visits++;
        (s.pagesVisited || []).forEach(p => existing.pages.add(p));
        existing.leadScore = Math.max(existing.leadScore, s.leadScore || 0);
        if (s.startTime > existing.lastSeen) existing.lastSeen = s.startTime;
      } else {
        companyMap.set(s.companyName, {
          domain: s.companyDomain,
          visits: 1,
          pages: new Set(s.pagesVisited || []),
          leadScore: s.leadScore || 0,
          lastSeen: s.startTime,
        });
      }
    }
  });

  const companies = Array.from(companyMap.entries())
    .map(([name, data]) => ({
      name,
      domain: data.domain,
      visits: data.visits,
      pagesViewed: Array.from(data.pages),
      leadScore: data.leadScore,
      lastSeen: data.lastSeen,
    }))
    .sort((a, b) => b.leadScore - a.leadScore)
    .slice(0, 10);

  // Conversions
  const conversions = humanSessions.filter(s => s.isConverted);
  const conversionsByType: Record<string, number> = {};
  conversions.forEach(s => {
    const type = s.conversionType || "unknown";
    conversionsByType[type] = (conversionsByType[type] || 0) + 1;
  });

  // Top converting pages (entry pages that led to conversions)
  const conversionEntryPages: Record<string, number> = {};
  conversions.forEach(s => {
    conversionEntryPages[s.entryPage] = (conversionEntryPages[s.entryPage] || 0) + 1;
  });
  const topConvertingPages = Object.entries(conversionEntryPages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([page, count]) => ({ page, conversions: count }));

  // Top content
  const pageMetrics: Record<string, { views: number; totalTime: number; conversions: number }> = {};
  humanEvents.filter(e => e.eventType === "pageview").forEach(e => {
    if (!pageMetrics[e.page]) pageMetrics[e.page] = { views: 0, totalTime: 0, conversions: 0 };
    pageMetrics[e.page].views++;
  });
  humanEvents.filter(e => e.eventType === "page_exit" && e.timeOnPage).forEach(e => {
    if (pageMetrics[e.page]) pageMetrics[e.page].totalTime += e.timeOnPage || 0;
  });
  conversions.forEach(s => {
    if (pageMetrics[s.exitPage || s.entryPage]) {
      pageMetrics[s.exitPage || s.entryPage].conversions++;
    }
  });

  const topContent = Object.entries(pageMetrics)
    .filter(([page]) => !page.includes("/admin"))
    .map(([page, metrics]) => ({
      page,
      views: metrics.views,
      avgTime: metrics.views > 0 ? Math.round(metrics.totalTime / metrics.views) : 0,
      conversions: metrics.conversions,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Generate follow-up recommendations
  const followUps: string[] = [];

  if (leadCounts.veryHot > 0) {
    followUps.push(`🔥 ${leadCounts.veryHot} Very Hot lead(s) - immediate follow-up recommended`);
  }
  if (leadCounts.hot > 0) {
    followUps.push(`🔥 ${leadCounts.hot} Hot lead(s) - review for outreach opportunities`);
  }
  if (companies.length > 0) {
    const highScoreCompanies = companies.filter(c => c.leadScore >= 50);
    if (highScoreCompanies.length > 0) {
      followUps.push(`🏢 ${highScoreCompanies.length} high-intent companies identified: ${highScoreCompanies.map(c => c.name).join(", ")}`);
    }
  }
  if (conversions.length === 0 && pageviews > 50) {
    followUps.push("⚠️ Good traffic but no conversions - review CTA placement");
  }
  if (bounceRate > 70) {
    followUps.push("⚠️ High bounce rate - consider improving landing page engagement");
  }

  return {
    date: yesterday,
    traffic: {
      pageviews,
      uniqueVisitors,
      sessions: totalSessions,
      avgSessionDuration,
      bounceRate: Math.round(bounceRate),
      vsLastWeekAvg: Math.round(vsLastWeekAvg),
    },
    leads: {
      ...leadCounts,
      total: totalSessions,
    },
    companies,
    conversions: {
      total: conversions.length,
      byType: conversionsByType,
      topConvertingPages,
    },
    topContent,
    followUps,
  };
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function generateEmailHtml(summary: DailySummary): string {
  const { traffic, leads, companies, conversions, topContent, followUps, date } = summary;

  const trendArrow = traffic.vsLastWeekAvg >= 0 ? "↑" : "↓";
  const trendColor = traffic.vsLastWeekAvg >= 0 ? "#10b981" : "#ef4444";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Analytics Summary - ${date}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { color: #1A9988; margin-bottom: 8px; }
    h2 { color: #1a1a1a; border-bottom: 2px solid #1A9988; padding-bottom: 8px; margin-top: 32px; }
    .date { color: #6b7280; font-size: 14px; }
    .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0; }
    .stat-card { background: #f8f9fa; border-radius: 8px; padding: 16px; }
    .stat-value { font-size: 28px; font-weight: bold; color: #1a1a1a; }
    .stat-label { color: #6b7280; font-size: 14px; }
    .trend { font-size: 14px; }
    .trend-up { color: #10b981; }
    .trend-down { color: #ef4444; }
    .lead-bar { display: flex; height: 24px; border-radius: 4px; overflow: hidden; margin: 8px 0; }
    .lead-very-hot { background: #dc2626; }
    .lead-hot { background: #f97316; }
    .lead-warm { background: #fbbf24; }
    .lead-cold { background: #d1d5db; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e5e7eb; }
    th { background: #f8f9fa; font-weight: 600; }
    .action-item { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 8px 0; border-radius: 0 4px 4px 0; }
    .footer { color: #6b7280; font-size: 12px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; }
    a { color: #1A9988; }
  </style>
</head>
<body>
  <h1>Databender Analytics</h1>
  <p class="date">Daily Summary for ${date}</p>

  <h2>Traffic Overview</h2>
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-value">${traffic.pageviews.toLocaleString()}</div>
      <div class="stat-label">Page Views</div>
      <div class="trend" style="color: ${trendColor}">${trendArrow} ${Math.abs(traffic.vsLastWeekAvg)}% vs avg</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${traffic.uniqueVisitors.toLocaleString()}</div>
      <div class="stat-label">Unique Visitors</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${formatDuration(traffic.avgSessionDuration)}</div>
      <div class="stat-label">Avg Session</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${traffic.bounceRate}%</div>
      <div class="stat-label">Bounce Rate</div>
    </div>
  </div>

  <h2>Lead Quality</h2>
  <div class="lead-bar">
    ${leads.veryHot > 0 ? `<div class="lead-very-hot" style="flex: ${leads.veryHot}" title="Very Hot: ${leads.veryHot}"></div>` : ''}
    ${leads.hot > 0 ? `<div class="lead-hot" style="flex: ${leads.hot}" title="Hot: ${leads.hot}"></div>` : ''}
    ${leads.warm > 0 ? `<div class="lead-warm" style="flex: ${leads.warm}" title="Warm: ${leads.warm}"></div>` : ''}
    ${leads.cold > 0 ? `<div class="lead-cold" style="flex: ${leads.cold}" title="Cold: ${leads.cold}"></div>` : ''}
  </div>
  <table>
    <tr><td>🔥🔥 Very Hot (76+)</td><td><strong>${leads.veryHot}</strong></td></tr>
    <tr><td>🔥 Hot (50-75)</td><td><strong>${leads.hot}</strong></td></tr>
    <tr><td>♨️ Warm (26-49)</td><td><strong>${leads.warm}</strong></td></tr>
    <tr><td>❄️ Cold (0-25)</td><td><strong>${leads.cold}</strong></td></tr>
  </table>

  ${companies.length > 0 ? `
  <h2>Identified Companies</h2>
  <table>
    <thead><tr><th>Company</th><th>Visits</th><th>Score</th></tr></thead>
    <tbody>
      ${companies.slice(0, 5).map(c => `
        <tr>
          <td><strong>${c.name}</strong>${c.domain ? `<br><small>${c.domain}</small>` : ''}</td>
          <td>${c.visits}</td>
          <td>${c.leadScore}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  <h2>Conversions</h2>
  <div class="stat-card">
    <div class="stat-value">${conversions.total}</div>
    <div class="stat-label">Total Conversions</div>
  </div>
  ${Object.keys(conversions.byType).length > 0 ? `
  <table>
    ${Object.entries(conversions.byType).map(([type, count]) => `
      <tr><td>${type.replace(/_/g, ' ')}</td><td><strong>${count}</strong></td></tr>
    `).join('')}
  </table>
  ` : '<p>No conversions recorded</p>'}

  ${topContent.length > 0 ? `
  <h2>Top Content</h2>
  <table>
    <thead><tr><th>Page</th><th>Views</th><th>Avg Time</th></tr></thead>
    <tbody>
      ${topContent.slice(0, 5).map(c => `
        <tr>
          <td>${c.page}</td>
          <td>${c.views}</td>
          <td>${formatDuration(c.avgTime)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${followUps.length > 0 ? `
  <h2>Action Items</h2>
  ${followUps.map(f => `<div class="action-item">${f}</div>`).join('')}
  ` : ''}

  <div class="footer">
    <p>This summary was automatically generated by Databender Analytics.</p>
    <p><a href="https://databender.co/admin/analytics">View Full Dashboard</a></p>
  </div>
</body>
</html>
  `;
}

export async function sendDailySummaryEmail(): Promise<boolean> {
  if (!SUMMARY_EMAIL) {
    console.log("Summary email not configured, skipping");
    return false;
  }

  try {
    const summary = await generateDailySummary();
    const htmlContent = generateEmailHtml(summary);

    const client = new SESClient({ region: SES_REGION });

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [SUMMARY_EMAIL],
      },
      Message: {
        Subject: {
          Data: `Databender Analytics Summary - ${summary.date}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlContent,
            Charset: "UTF-8",
          },
        },
      },
    });

    await client.send(command);
    console.log(`Daily summary email sent to ${SUMMARY_EMAIL}`);
    return true;
  } catch (error) {
    console.error("Failed to send daily summary email:", error);
    return false;
  }
}
