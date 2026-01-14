/**
 * Traffic source categorization utilities
 * Categorizes traffic from referrer URLs and UTM parameters
 */

export type TrafficSource =
  | "linkedin"
  | "twitter"
  | "organic"
  | "direct"
  | "referral"
  | "paid"
  | "other";

/**
 * Categorize traffic source from referrer URL and UTM params
 * Priority: UTM params > Referrer URL > Default to direct
 */
export function categorizeSource(
  referrer: string | null,
  utmSource?: string,
  utmMedium?: string
): TrafficSource {
  // If UTM params exist, use them first
  if (utmSource) {
    if (utmMedium === "cpc" || utmMedium === "paid" || utmMedium === "ppc") {
      return "paid";
    }
    if (utmSource.toLowerCase() === "linkedin") {
      return "linkedin";
    }
    if (utmSource.toLowerCase() === "twitter" || utmSource.toLowerCase() === "x") {
      return "twitter";
    }
  }

  // No referrer = direct
  if (!referrer) {
    return "direct";
  }

  const ref = referrer.toLowerCase();

  // Internal referrers (same site) = direct
  if (ref.includes("databender.co") || ref.includes("databender.com")) {
    return "direct";
  }

  // Social platforms
  if (ref.includes("linkedin.com")) {
    return "linkedin";
  }
  if (ref.includes("twitter.com") || ref.includes("x.com") || ref.includes("t.co")) {
    return "twitter";
  }

  // Search engines = organic
  if (
    ref.includes("google.") ||
    ref.includes("bing.") ||
    ref.includes("duckduckgo.") ||
    ref.includes("yahoo.") ||
    ref.includes("baidu.") ||
    ref.includes("yandex.")
  ) {
    return "organic";
  }

  // Everything else is referral
  return "referral";
}

/**
 * Extract clean domain from a URL string
 * Removes www. prefix and protocol
 */
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

/**
 * Get human-readable label for traffic source
 */
export function getSourceLabel(source: TrafficSource): string {
  const labels: Record<TrafficSource, string> = {
    linkedin: "LinkedIn",
    twitter: "Twitter/X",
    organic: "Organic Search",
    direct: "Direct",
    referral: "Referral",
    paid: "Paid Ads",
    other: "Other",
  };
  return labels[source] || source;
}
