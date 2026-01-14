import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange } from "@/lib/analytics/dynamodb";

// Extended bot patterns with specific crawler identification
const CRAWLER_PATTERNS: { pattern: RegExp; name: string; category: string }[] = [
  // Search Engine Crawlers
  { pattern: /Googlebot\/\d/i, name: "Googlebot", category: "Search Engine" },
  { pattern: /Googlebot-Image/i, name: "Googlebot Image", category: "Search Engine" },
  { pattern: /Googlebot-News/i, name: "Googlebot News", category: "Search Engine" },
  { pattern: /Googlebot-Video/i, name: "Googlebot Video", category: "Search Engine" },
  { pattern: /AdsBot-Google/i, name: "AdsBot Google", category: "Search Engine" },
  { pattern: /Mediapartners-Google/i, name: "Google AdSense", category: "Search Engine" },
  { pattern: /bingbot/i, name: "Bingbot", category: "Search Engine" },
  { pattern: /msnbot/i, name: "MSN Bot", category: "Search Engine" },
  { pattern: /Slurp/i, name: "Yahoo! Slurp", category: "Search Engine" },
  { pattern: /DuckDuckBot/i, name: "DuckDuckBot", category: "Search Engine" },
  { pattern: /Baiduspider/i, name: "Baidu Spider", category: "Search Engine" },
  { pattern: /YandexBot/i, name: "Yandex Bot", category: "Search Engine" },
  { pattern: /Sogou/i, name: "Sogou Spider", category: "Search Engine" },
  { pattern: /Exabot/i, name: "Exalead Bot", category: "Search Engine" },

  // AI Crawlers
  { pattern: /GPTBot/i, name: "GPTBot (OpenAI)", category: "AI" },
  { pattern: /ChatGPT-User/i, name: "ChatGPT User", category: "AI" },
  { pattern: /Claude-Web/i, name: "Claude Web", category: "AI" },
  { pattern: /Anthropic-AI/i, name: "Anthropic AI", category: "AI" },
  { pattern: /PerplexityBot/i, name: "Perplexity Bot", category: "AI" },
  { pattern: /YouBot/i, name: "You.com Bot", category: "AI" },
  { pattern: /cohere-ai/i, name: "Cohere AI", category: "AI" },
  { pattern: /Google-Extended/i, name: "Google AI (Extended)", category: "AI" },
  { pattern: /CCBot/i, name: "Common Crawl", category: "AI" },

  // Social Media
  { pattern: /facebookexternalhit/i, name: "Facebook Crawler", category: "Social" },
  { pattern: /Facebot/i, name: "Facebook Bot", category: "Social" },
  { pattern: /Twitterbot/i, name: "Twitter Bot", category: "Social" },
  { pattern: /LinkedInBot/i, name: "LinkedIn Bot", category: "Social" },
  { pattern: /Slackbot/i, name: "Slack Bot", category: "Social" },
  { pattern: /Discordbot/i, name: "Discord Bot", category: "Social" },
  { pattern: /TelegramBot/i, name: "Telegram Bot", category: "Social" },
  { pattern: /WhatsApp/i, name: "WhatsApp", category: "Social" },
  { pattern: /Pinterest/i, name: "Pinterest", category: "Social" },

  // SEO Tools
  { pattern: /SemrushBot/i, name: "Semrush Bot", category: "SEO Tool" },
  { pattern: /AhrefsBot/i, name: "Ahrefs Bot", category: "SEO Tool" },
  { pattern: /MJ12bot/i, name: "Majestic Bot", category: "SEO Tool" },
  { pattern: /DotBot/i, name: "Moz DotBot", category: "SEO Tool" },
  { pattern: /Screaming Frog/i, name: "Screaming Frog", category: "SEO Tool" },
  { pattern: /rogerbot/i, name: "Moz Roger Bot", category: "SEO Tool" },

  // Archive/Research
  { pattern: /ia_archiver/i, name: "Internet Archive", category: "Archive" },
  { pattern: /archive\.org_bot/i, name: "Archive.org Bot", category: "Archive" },

  // Monitoring/Uptime
  { pattern: /UptimeRobot/i, name: "Uptime Robot", category: "Monitoring" },
  { pattern: /Pingdom/i, name: "Pingdom", category: "Monitoring" },
  { pattern: /StatusCake/i, name: "StatusCake", category: "Monitoring" },
  { pattern: /Site24x7/i, name: "Site24x7", category: "Monitoring" },

  // Security Scanners
  { pattern: /Detectify/i, name: "Detectify", category: "Security" },
  { pattern: /Nessus/i, name: "Nessus", category: "Security" },

  // Feed Readers
  { pattern: /Feedly/i, name: "Feedly", category: "Feed Reader" },
  { pattern: /Feedbin/i, name: "Feedbin", category: "Feed Reader" },

  // Apple
  { pattern: /Applebot/i, name: "Applebot", category: "Search Engine" },

  // Generic patterns (fallback)
  { pattern: /bot/i, name: "Unknown Bot", category: "Other" },
  { pattern: /crawler/i, name: "Unknown Crawler", category: "Other" },
  { pattern: /spider/i, name: "Unknown Spider", category: "Other" },
];

function identifyCrawler(userAgent: string): { name: string; category: string } | null {
  if (!userAgent) return null;

  for (const { pattern, name, category } of CRAWLER_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { name, category };
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const days = parseInt(searchParams.get("days") || "7", 10);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const events = await getEventsForDateRange(startStr, endStr);

    // Filter for bot events (pageviews only for cleaner stats)
    const botEvents = events.filter(e => e.isBot && e.eventType === "pageview");

    // Aggregate by crawler
    const crawlerStats: Record<string, {
      name: string;
      category: string;
      pageviews: number;
      uniquePages: Set<string>;
      lastSeen: string;
    }> = {};

    for (const event of botEvents) {
      const crawler = identifyCrawler(event.userAgent || "");
      const key = crawler?.name || "Unknown";

      if (!crawlerStats[key]) {
        crawlerStats[key] = {
          name: key,
          category: crawler?.category || "Other",
          pageviews: 0,
          uniquePages: new Set(),
          lastSeen: event.timestamp,
        };
      }

      crawlerStats[key].pageviews++;
      crawlerStats[key].uniquePages.add(event.page);
      if (event.timestamp > crawlerStats[key].lastSeen) {
        crawlerStats[key].lastSeen = event.timestamp;
      }
    }

    // Convert to array and sort by pageviews
    const crawlers = Object.values(crawlerStats)
      .map(c => ({
        name: c.name,
        category: c.category,
        pageviews: c.pageviews,
        uniquePages: c.uniquePages.size,
        lastSeen: c.lastSeen,
      }))
      .sort((a, b) => b.pageviews - a.pageviews);

    // Aggregate by category
    const byCategory: Record<string, number> = {};
    for (const crawler of crawlers) {
      byCategory[crawler.category] = (byCategory[crawler.category] || 0) + crawler.pageviews;
    }

    // Summary
    const totalCrawlerPageviews = crawlers.reduce((sum, c) => sum + c.pageviews, 0);
    const totalHumanPageviews = events.filter(e => !e.isBot && e.eventType === "pageview").length;

    return NextResponse.json({
      crawlers,
      byCategory,
      summary: {
        totalCrawlerPageviews,
        totalHumanPageviews,
        crawlerPercent: totalHumanPageviews + totalCrawlerPageviews > 0
          ? Math.round((totalCrawlerPageviews / (totalHumanPageviews + totalCrawlerPageviews)) * 100)
          : 0,
        uniqueCrawlers: crawlers.length,
      },
      period: { start: startStr, end: endStr, days },
    });
  } catch (error) {
    console.error("Error fetching crawler data:", error);
    return NextResponse.json(
      { error: "Failed to fetch crawler data" },
      { status: 500 }
    );
  }
}
