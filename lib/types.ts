export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImageHotspot {
  x: number
  y: number
  width: number
  height: number
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  hotspot?: SanityImageHotspot
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type LocationCode = 'ULUWATU' | 'MUNICH'

export type SocialPlatform = 'instagram' | 'threads' | 'linkedin' | 'email' | 'other'

export interface Social {
  _key: string
  platform: SocialPlatform
  url: string
  label: string
}

export interface SEO {
  title?: string
  description?: string
  ogImage?: SanityImage
}

export interface BioSettings {
  name: string
  role: string
  portrait: SanityImage
  bio: unknown[]
  locationCode: LocationCode
  socials: Social[]
  imprint: string
  dataPrivacy: string
  copyrightYear: string
  seo?: SEO
}

export interface GalleryItem {
  _id: string
  image: SanityImage
  caption?: string
  date: string
}
