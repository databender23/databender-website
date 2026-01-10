import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
