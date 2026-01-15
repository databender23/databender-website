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
    default: "Databender | Senior Expertise. AI-Powered Speed.",
    template: "%s | Databender",
  },
  description:
    "AI-powered data solutions that transform messy data into business intelligence. Data cleanup, integration, analytics, and AI insights for mid-market companies.",
  keywords: [
    "data consulting",
    "AI data cleanup",
    "business intelligence",
    "data analytics",
    "data integration",
    "AI insights",
  ],
  authors: [{ name: "Databender" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Databender",
    title: "Databender | Senior Expertise. AI-Powered Speed.",
    description:
      "AI-powered data solutions that transform messy data into business intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Databender | Senior Expertise. AI-Powered Speed.",
    description:
      "AI-powered data solutions that transform messy data into business intelligence.",
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
