import type { Metadata } from 'next'
import { Inter, Lato, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { sanityFetch } from '@/lib/sanity'
import { urlFor } from '@/lib/sanityImage'
import { seoSettingsQuery } from '@/lib/queries'
import type { SanityImage } from '@/lib/types'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['700'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '500'],
  display: 'swap',
})

interface SeoSettings {
  name?: string
  siteTitle?: string
  favicon?: SanityImage
  ogImage?: SanityImage
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<SeoSettings>(seoSettingsQuery)

  const faviconUrl = seo?.favicon
    ? urlFor(seo.favicon)?.width(256).height(256).fit('crop').url() ?? null
    : null

  const ogImageUrl = seo?.ogImage
    ? urlFor(seo.ogImage)?.width(1200).height(630).fit('crop').url() ?? null
    : null

  const siteName = seo?.siteTitle || seo?.name || 'Chris Faber'

  return {
    title: {
      default: siteName,
      template: `%s · ${siteName}`,
    },
    description: 'Computer Graphics Artist – Exploring the beauty of form, surface and light.',
    metadataBase: new URL('https://chrisfaber.me'),
    icons: {
      icon: faviconUrl
        ? [{ url: faviconUrl }, { url: '/icon.svg', type: 'image/svg+xml' }]
        : [{ url: '/icon.svg', type: 'image/svg+xml' }],
      shortcut: faviconUrl ?? '/icon.svg',
    },
    ...(ogImageUrl && {
      openGraph: {
        siteName,
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [ogImageUrl],
      },
    }),
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lato.variable} ${robotoMono.variable}`}
    >
      <body className="font-mono bg-bg text-ink min-h-screen">
        {children}
      </body>
    </html>
  )
}
