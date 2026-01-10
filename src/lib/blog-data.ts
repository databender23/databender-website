import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "beyond-points-the-advanced-metrics-for-winning-teams",
    title: "Beyond Points: The Advanced Metrics For Winning Teams",
    excerpt: "Success requires moving beyond traditional strategies to embrace data-driven decision-making for a competitive edge.",
    content: `<h3 class="wp-block-heading has-text-align-left">A value-based strategy for drafting a dream team</h3>

<p>Analytics is not just for business. With football season approaching, let's explore our favorite data-driven draft strategy.</p>

<p>This analysis helps you draft your team using the Value Over Replacement (VOR) approach. VOR measures the value a player adds compared to <em>the average player</em> at their position, revealing the true scarcity value of players across different positions.</p>

<p><em>The VOR data is available in the app below. Continue reading for a detailed analysis of 2025's results and draft advice.</em></p>

<figure><iframe title="Fantasy Football Dashboard 2025" width="600" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZWQxNjdjOTYtMjc2ZC00ZDllLTgyNTktYWM4YTZlZjY3ZjFmIiwidCI6ImE0ZDAzODUwLTI5Y2MtNDk5MC04NTc5LTc5NTdmZmM4OTUyYyIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe></figure>

<p><strong>How to find maximum value in your draft</strong></p>

<p>The best way to approach a draft like this is to think of players like stocks. The goal is to pick players that others undervalue and maximize potential upside for bench players while minimizing risk for starters.</p>

<figure class="wp-block-image"><img decoding="async" src="https://cdn-images-1.medium.com/max/1600/1*hgObKGXSPetLJDcPXgfSsQ.jpeg" alt=""/><figcaption class="wp-element-caption">Brad Pitt and Jonah Hill use "sabermetrics" in Moneyball</figcaption></figure>

<p>To accurately determine a player's value, we need to compare their projected points to the average player at the same position. We define an average player as: <em>the player whose rank at a position matches the average number of players chosen at that position by pick 100.</em></p>

<p>After calculating each player's value, we can compare it to the average value at their position to determine the VOR. You can find a more detailed explanation of the VOR calculation and all other metrics used in the app in the documentation for the <a href="https://github.com/FantasyFootballAnalytics/ffanalytics" target="_blank" rel="noreferrer noopener">ffanalytics R package</a>.</p>

<p><strong>The VOR Insight: Quarterbacks Aren't Everything</strong></p>

<p>VOR highlights the problem of focusing only on projected points when drafting. When looking at projected points, it is easy to think that a quarterback is the most valuable player. However, when we look at the <strong>2025 VOR rankings</strong>, the story changes:</p>

<ol class="wp-block-list">
<li><strong>Bijan Robinson (RB)</strong> — 182.2</li>
<li><strong>Saquon Barkley (RB)</strong> — 170.5</li>
<li><strong>Jahmyr Gibbs (RB)</strong> — 170.5</li>
<li><strong>Ja'Marr Chase (WR)</strong> — 158.3</li>
<li><strong>De'Von Achane (RB)</strong> — 148.1</li>
<li><strong>Christian McCaffrey (RB)</strong> — 143.6</li>
<li><strong>Josh Jacobs (RB)</strong> — 121.2</li>
<li><strong>Derrick Henry (RB)</strong> — 120.7</li>
<li><strong>Ashton Jeanty (RB)</strong> — 119.8</li>
<li><strong>Justin Jefferson (WR)</strong> — 119.0</li>
</ol>

<p>The concentration of value in elite running backs this year makes early draft strategy more critical than ever. The draft order will be very important this season.</p>

<p><strong>Draft advice</strong></p>

<ol class="wp-block-list">
<li><strong>Prioritize Elite Running Backs Early</strong>: With the top 8 VOR slots dominated by RBs, securing at least one elite back in the first two rounds is crucial.</li>
<li><strong>Draft your starting lineup before any bench players</strong>
<ul class="wp-block-list">
<li>For starters — target players with the highest VOR, a low-risk rating, and a high floor for projected points.</li>
<li>For bench players — aim for players with the highest VOR and a high ceiling to maximize the potential upside (higher risk is ok for bench players)</li>
</ul>
</li>
<li><strong>Wait on Quarterbacks</strong>: With even elite QBs like Josh Allen and Lamar Jackson showing VOR values under 90, you can find tremendous value waiting until the middle rounds.</li>
<li><strong>Target Elite Tight Ends</strong>: If you can snag Bowers or McBride, the positional advantage is worth the investment.</li>
<li><strong>Draft Defense and Kickers last (if at all)</strong> because they are less predictable and score fewer points.</li>
</ol>

<p>We wish you all the best in your 2025 fantasy season! Please feel free to share this application with friends/competitors, and let us know if you have any feedback.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<p><em>If you have any questions about data management, advanced analytics, or have a general interest in data — head to <a href="http://databender.co/" target="_blank" rel="noreferrer noopener">databenderconsulting.com</a> for more information, or give us a follow on <a href="https://www.linkedin.com/company/databender/" target="_blank" rel="noreferrer noopener">LinkedIn</a>.</em></p>`,
    author: "Databender Team",
    publishedAt: "2025-08-19",
    updatedAt: "2025-08-19",
    category: "Data Management",
    tags: ["analytics", "fantasy-football", "data-driven"],
    readingTime: 4,
    featured: true,
  },
];

export const blogCategories = [
  "All",
  "Data Management",
  "AI & Automation",
  "Business Intelligence",
  "Case Studies",
  "Industry Insights",
  "News",
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
