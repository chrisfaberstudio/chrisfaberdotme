import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { sanityFetch } from '@/lib/sanity'
import { urlFor } from '@/lib/sanityImage'
import { seoSettingsQuery } from '@/lib/queries'
import type { SanityImage } from '@/lib/types'

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const lato = localFont({
  src: [
    { path: '../public/fonts/lato-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lato',
  display: 'swap',
})

const robotoMono = localFont({
  src: [
    { path: '../public/fonts/roboto-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/roboto-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-roboto-mono',
  display: 'swap',
})

interface SeoSettings {
  name?: string
  siteTitle?: string
  metaDescription?: string
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
    description: seo?.metaDescription || 'Computer Graphics Artist – Exploring the beauty of form, surface and light.',
    metadataBase: new URL('https://chrisfaber.me'),
    icons: {
      icon: faviconUrl
        ? [{ url: faviconUrl, type: 'image/png', sizes: '256x256' }]
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
