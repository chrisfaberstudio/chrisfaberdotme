import { createClient } from '@sanity/client'

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '').trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

const base = { projectId, dataset, apiVersion: '2024-01-01', perspective: 'published' as const }

// Server-side (build time): bypass CDN for guaranteed fresh data
export const client = projectId ? createClient({ ...base, useCdn: false }) : null

// Browser-side: CDN is fast, globally distributed, and allows all origins for public reads
export const browserClient = projectId ? createClient({ ...base, useCdn: true }) : null

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!client) return null
  return client.fetch<T>(query)
}
