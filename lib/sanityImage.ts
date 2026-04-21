import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '').trim()
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production').trim()

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null

export function urlFor(source: SanityImageSource) {
  return builder ? builder.image(source) : null
}
