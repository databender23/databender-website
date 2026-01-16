/**
 * HTML Escape Utility
 *
 * Prevents XSS attacks by escaping HTML special characters in user-provided content.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Escape HTML special characters in a string
 *
 * @param str - The string to escape
 * @returns The escaped string safe for HTML interpolation
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Escape HTML in an object's string values (shallow)
 *
 * @param obj - Object with string values to escape
 * @returns New object with escaped string values
 */
export function escapeHtmlObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj } as T;

  for (const key of Object.keys(result)) {
    const value = result[key as keyof T];
    if (typeof value === "string") {
      (result as Record<string, unknown>)[key] = escapeHtml(value);
    }
  }

  return result;
}

/**
 * Sanitize a URL for use in href attributes
 * Prevents javascript: URLs and other dangerous protocols
 *
 * @param url - The URL to sanitize
 * @param allowedProtocols - List of allowed protocols (default: http, https, mailto)
 * @returns The sanitized URL or empty string if invalid
 */
export function sanitizeUrl(
  url: string,
  allowedProtocols: string[] = ["http:", "https:", "mailto:"]
): string {
  try {
    const parsed = new URL(url);
    if (!allowedProtocols.includes(parsed.protocol)) {
      return "";
    }
    return url;
  } catch {
    // If URL is invalid, check if it's a relative path
    if (url.startsWith("/") && !url.startsWith("//")) {
      return url;
    }
    return "";
  }
}
