/**
 * Unsubscribe Handler
 *
 * Handles unsubscribe requests from email sequence links.
 * Uses token-based authentication to validate the request.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  decodeUnsubscribeToken,
  unsubscribeFromSequence,
} from "@/lib/sequences/sequence-service";
import { escapeHtml, sanitizeUrl } from "@/lib/html-escape";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return createHtmlResponse(
      "Invalid Request",
      "Missing unsubscribe token. Please use the link from your email.",
      false
    );
  }

  // Decode and validate the token
  const payload = decodeUnsubscribeToken(token);

  if (!payload) {
    return createHtmlResponse(
      "Invalid Link",
      "This unsubscribe link is invalid or has expired. Please contact support if you need assistance.",
      false
    );
  }

  // Check token age (valid for 90 days)
  const tokenAge = Date.now() - payload.ts;
  const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds

  if (tokenAge > maxAge) {
    return createHtmlResponse(
      "Link Expired",
      "This unsubscribe link has expired. Please contact support if you need assistance.",
      false
    );
  }

  // Process the unsubscribe
  try {
    const success = await unsubscribeFromSequence(payload.email);

    if (success) {
      return createHtmlResponse(
        "Successfully Unsubscribed",
        `You have been unsubscribed from our email sequence. You will no longer receive automated follow-up emails from us.`,
        true
      );
    } else {
      return createHtmlResponse(
        "Unsubscribe Processed",
        "Your unsubscribe request has been processed. If you continue to receive emails, please contact support.",
        true
      );
    }
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return createHtmlResponse(
      "Something Went Wrong",
      "We encountered an issue processing your request. Please try again later or contact support.",
      false
    );
  }
}

// Support POST for form-based unsubscribe if needed
export async function POST(request: NextRequest) {
  return GET(request);
}

/**
 * Create an HTML response page
 */
function createHtmlResponse(
  title: string,
  message: string,
  success: boolean
): NextResponse {
  const siteUrl = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co");

  // Escape user-controllable content to prevent XSS
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} - Databender</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8f9fa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 480px;
      background: white;
      border-radius: 12px;
      padding: 48px 40px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
    }
    .icon.success {
      background-color: #d1fae5;
      color: #059669;
    }
    .icon.error {
      background-color: #fee2e2;
      color: #dc2626;
    }
    h1 {
      font-size: 24px;
      color: #1a1a1a;
      margin-bottom: 16px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      color: #4a4a4a;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .back-link {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1A9988;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .back-link:hover {
      background-color: #147a6c;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon ${success ? "success" : "error"}">
      ${success ? "✓" : "!"}
    </div>
    <h1>${safeTitle}</h1>
    <p>${safeMessage}</p>
    <a href="${siteUrl}" class="back-link">Return to Databender</a>
    <div class="footer">
      <p>Questions? Contact us at <a href="mailto:hello@databender.co" style="color: #1A9988;">hello@databender.co</a></p>
    </div>
  </div>
</body>
</html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
