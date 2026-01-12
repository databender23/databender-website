import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Entity Resolution Case Study | 125x Cost Savings | Databender',
  description:
    'Learn how we used AI to resolve 1.69 million records across 47 systems, achieving 125x cost savings and 99.7% accuracy in just 6 weeks.',
  openGraph: {
    title: 'AI Entity Resolution Case Study | Databender',
    description:
      'From 1.69M chaotic records to a single source of truth. See how AI-powered entity resolution delivered 125x cost savings.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Entity Resolution Case Study | Databender',
    description:
      'From 1.69M chaotic records to a single source of truth. See how AI-powered entity resolution delivered 125x cost savings.',
  },
}

export default function EntityResolutionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
