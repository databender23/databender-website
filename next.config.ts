import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  // Embed server-side env vars at build time for Amplify SSR Lambda runtime
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL,
    SES_REGION: process.env.SES_REGION,
    CHAT_NOTIFY_EMAIL: process.env.CHAT_NOTIFY_EMAIL,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    DYNAMODB_REGION: process.env.DYNAMODB_REGION,
    WEBHOOK_API_KEY: process.env.WEBHOOK_API_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
    UNSUBSCRIBE_SECRET: process.env.UNSUBSCRIBE_SECRET,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Data Management consolidation
      {
        source: "/services/data-foundation",
        destination: "/services/data-management",
        permanent: true,
      },
      {
        source: "/services/data-integration",
        destination: "/services/data-management",
        permanent: true,
      },
      {
        source: "/services/ai-data-cleanup",
        destination: "/services/data-management",
        permanent: true,
      },
      // Analytics & BI consolidation
      {
        source: "/services/dashboards-analytics",
        destination: "/services/analytics-bi",
        permanent: true,
      },
      {
        source: "/services/operational-visibility",
        destination: "/services/analytics-bi",
        permanent: true,
      },
      {
        source: "/services/predictive-analytics",
        destination: "/services/analytics-bi",
        permanent: true,
      },
      // AI Services consolidation
      {
        source: "/services/natural-language-bi",
        destination: "/services/ai-services",
        permanent: true,
      },
      {
        source: "/services/ai-insights",
        destination: "/services/ai-services",
        permanent: true,
      },
      // Legacy URLs that might exist
      {
        source: "/services/business-intelligence",
        destination: "/services/analytics-bi",
        permanent: true,
      },
      {
        source: "/services/ai-analytics",
        destination: "/services/ai-services",
        permanent: true,
      },
      // Guide slug updates
      {
        source: "/resources/guides/operational-visibility",
        destination: "/resources/guides/operational-visibility-playbook",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
