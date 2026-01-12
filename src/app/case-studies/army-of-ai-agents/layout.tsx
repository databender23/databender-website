import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Turning Data Chaos Into a Single Source of Truth | Databender',
  description:
    'When you have 1.5M records and no idea how many are duplicates... See how AI found the same person across messy databases, achieving 125x cost savings.',
  openGraph: {
    title: 'Data Chaos to Single Source of Truth | Databender',
    description:
      'What if 30% of your database is duplicates? From 1.5M scattered records to 100K unified customers. See the transformation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Chaos to Single Source of Truth | Databender',
    description:
      'What if 30% of your database is duplicates? From 1.5M scattered records to 100K unified customers. See the transformation.',
  },
}

export default function EntityResolutionV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
