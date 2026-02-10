import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://databender.co'),
  title: {
    default: "Databender | Rethink What's Possible.",
    template: "%s | Databender",
  },
  description:
    "Custom data and AI solutions at a fraction of the old cost. Senior consultants with AI-powered delivery build what used to take months in weeks. Data strategy, analytics, and automation for growing companies.",
  keywords: [
    "data consulting",
    "AI data cleanup",
    "business intelligence",
    "data analytics",
    "data integration",
    "AI consulting",
    "custom data solutions",
    "mid-market data consulting",
  ],
  authors: [{ name: "Databender" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Databender",
    title: "Databender | Rethink What's Possible.",
    description:
      "Custom data and AI solutions at a fraction of the old cost. What used to take months now takes weeks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Databender | Rethink What's Possible.",
    description:
      "Custom data and AI solutions at a fraction of the old cost. What used to take months now takes weeks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={organizationSchema()} />
        <ClientProviders>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
