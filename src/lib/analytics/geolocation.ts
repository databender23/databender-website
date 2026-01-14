export interface GeoData {
  city: string;
  region: string;
  regionCode: string;
  country: string;
  countryCode: string;
}

/**
 * Check if IP is private/local (not routable on the internet)
 */
function isPrivateIP(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;

  // Check private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
  const parts = ip.split(".");
  if (parts.length !== 4) return true;

  const first = parseInt(parts[0]);
  const second = parseInt(parts[1]);

  if (first === 10) return true;
  if (first === 172 && second >= 16 && second <= 31) return true;
  if (first === 192 && second === 168) return true;

  return false;
}

/**
 * Get geographic location data from IP address using ip-api.com
 * Free tier: 45 requests/minute, no API key required
 */
export async function getGeoFromIP(ip: string): Promise<GeoData | null> {
  if (isPrivateIP(ip)) return null;

  try {
    // Using ip-api.com free tier (45 req/min, no key needed)
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,city,region,regionCode,country,countryCode`,
      {
        next: { revalidate: 86400 }, // Cache for 24h
        signal: AbortSignal.timeout(2000), // 2 second timeout
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.status !== "success") return null;

    return {
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      regionCode: data.regionCode || "",
      country: data.country || "Unknown",
      countryCode: data.countryCode || "",
    };
  } catch (error) {
    console.error("Geo lookup failed:", error);
    return null;
  }
}
