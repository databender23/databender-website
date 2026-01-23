/**
 * Email Tracking Utilities
 *
 * Provides encoding/decoding for tracking IDs and utilities for
 * adding tracking pixels and click tracking to emails.
 */

/**
 * Data encoded in a tracking ID
 */
export interface TrackingData {
  leadId: string;
  emailDay: number;
  sequenceType: string;
  emailId?: string;
  destinationUrl?: string;
}

/**
 * Encode tracking data into a URL-safe base64 string
 */
export function encodeTrackingId(data: TrackingData): string {
  const json = JSON.stringify(data);
  // Use base64url encoding (URL-safe base64)
  return Buffer.from(json, "utf-8").toString("base64url");
}

/**
 * Decode a tracking ID back into its component data
 */
export function decodeTrackingId(trackingId: string): TrackingData | null {
  try {
    const json = Buffer.from(trackingId, "base64url").toString("utf-8");
    const data = JSON.parse(json);

    // Validate required fields
    if (
      typeof data.leadId !== "string" ||
      typeof data.emailDay !== "number" ||
      typeof data.sequenceType !== "string"
    ) {
      return null;
    }

    return {
      leadId: data.leadId,
      emailDay: data.emailDay,
      sequenceType: data.sequenceType,
      emailId: data.emailId,
      destinationUrl: data.destinationUrl,
    };
  } catch {
    return null;
  }
}

/**
 * 1x1 transparent GIF as a Buffer
 * This is the smallest valid GIF image (43 bytes)
 */
export const TRANSPARENT_GIF: Buffer = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

/**
 * Get the base URL for tracking endpoints
 */
function getTrackingBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co";
}

/**
 * Add a tracking pixel to an HTML email body
 *
 * The pixel is added just before the closing </body> tag
 */
export function addTrackingPixel(htmlBody: string, trackingId: string): string {
  const baseUrl = getTrackingBaseUrl();
  const pixelUrl = `${baseUrl}/api/track/open/${trackingId}`;

  // Create the tracking pixel img tag
  const pixelTag = `<img src="${pixelUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />`;

  // Insert before </body> if it exists
  const bodyCloseIndex = htmlBody.lastIndexOf("</body>");
  if (bodyCloseIndex !== -1) {
    return (
      htmlBody.slice(0, bodyCloseIndex) + pixelTag + htmlBody.slice(bodyCloseIndex)
    );
  }

  // If no </body> tag, append at the end
  return htmlBody + pixelTag;
}

/**
 * Wrap all links in HTML with click tracking
 *
 * Skips unsubscribe links to ensure compliance
 */
export function wrapLinksWithTracking(
  html: string,
  leadId: string,
  emailDay: number,
  sequenceType: string,
  emailId?: string
): string {
  const baseUrl = getTrackingBaseUrl();

  // Regex to match href attributes with URLs
  // Captures: href="URL" or href='URL'
  const hrefRegex = /href=["']([^"']+)["']/gi;

  return html.replace(hrefRegex, (match, url: string) => {
    // Skip unsubscribe links - these should always work directly
    if (url.toLowerCase().includes("unsubscribe")) {
      return match;
    }

    // Skip mailto: links
    if (url.toLowerCase().startsWith("mailto:")) {
      return match;
    }

    // Skip tel: links
    if (url.toLowerCase().startsWith("tel:")) {
      return match;
    }

    // Skip anchor links
    if (url.startsWith("#")) {
      return match;
    }

    // Skip already-tracked links
    if (url.includes("/api/track/click/")) {
      return match;
    }

    // Create tracking data with destination URL
    const trackingData: TrackingData = {
      leadId,
      emailDay,
      sequenceType,
      emailId,
      destinationUrl: url,
    };

    const trackingId = encodeTrackingId(trackingData);
    const trackedUrl = `${baseUrl}/api/track/click/${trackingId}`;

    // Preserve the original quote style
    const quoteChar = match.includes('"') ? '"' : "'";
    return `href=${quoteChar}${trackedUrl}${quoteChar}`;
  });
}

/**
 * Apply both open and click tracking to an email
 *
 * This is a convenience function that combines addTrackingPixel and wrapLinksWithTracking
 */
export function applyEmailTracking(
  htmlBody: string,
  leadId: string,
  emailDay: number,
  sequenceType: string,
  emailId?: string
): string {
  // Create tracking ID for the open pixel (no destination URL needed)
  const openTrackingData: TrackingData = {
    leadId,
    emailDay,
    sequenceType,
    emailId,
  };
  const openTrackingId = encodeTrackingId(openTrackingData);

  // First wrap links with click tracking
  let trackedHtml = wrapLinksWithTracking(
    htmlBody,
    leadId,
    emailDay,
    sequenceType,
    emailId
  );

  // Then add the open tracking pixel
  trackedHtml = addTrackingPixel(trackedHtml, openTrackingId);

  return trackedHtml;
}
