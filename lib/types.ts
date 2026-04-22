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

export type SocialPlatform = 'instagram' | 'threads' | 'linkedin' | 'email' | 'whatsapp' | 'calendar' | 'other'

export interface Social {
  _key: string
  platform: SocialPlatform
  url: string
  label: string
}

export interface BioSettings {
  name: string
  siteTitle?: string
  role: string
  portrait: SanityImage
  bio: Array<{ _type: string; [key: string]: unknown }>
  about?: Array<{ _type: string; [key: string]: unknown }>
  about2?: Array<{ _type: string; [key: string]: unknown }>
  locationCode: LocationCode
  socials: Social[]
  imprint?: Array<{ _type: string; [key: string]: unknown }>
  dataPrivacy?: Array<{ _type: string; [key: string]: unknown }>
}


export interface GalleryItem {
  _id: string
  image: SanityImage
  caption?: string
}
