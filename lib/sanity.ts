import { createClient } from '@sanity/client'

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '').trim()

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!client) return null
  return client.fetch<T>(query)
}
