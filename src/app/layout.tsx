import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Databender | Boutique Strategy. Enterprise Delivery.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Databender",
    title: "Databender | Boutique Strategy. Enterprise Delivery.",
    description:
      "AI-powered data solutions that transform messy data into business intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Databender | Boutique Strategy. Enterprise Delivery.",
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
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
