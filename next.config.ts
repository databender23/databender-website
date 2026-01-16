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
