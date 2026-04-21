import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity'
import { urlFor } from '@/lib/sanityImage'
import { bioSettingsQuery, galleryItemsQuery } from '@/lib/queries'
import type { BioSettings, GalleryItem } from '@/lib/types'
import { Portrait } from '@/components/Portrait'
import { LocationPill } from '@/components/LocationPill'
import { Socials } from '@/components/Socials'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<BioSettings>(bioSettingsQuery)
  return {
    title: settings?.siteTitle ?? settings?.seo?.title ?? settings?.name ?? 'Chris Faber',
    description: settings?.seo?.description ?? '',
    openGraph: settings?.seo?.ogImage
      ? { images: [{ url: urlFor(settings.seo.ogImage)?.width(1200).height(630).auto('format').url() ?? '' }] }
      : undefined,
  }
}

const bioComponents = {
  block: {
    normal: ({ children }: { children?: import('react').ReactNode }) => (
      <p className="mb-3 last:mb-0 text-ink/70 leading-relaxed text-center">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: import('react').ReactNode }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    em: ({ children }: { children?: import('react').ReactNode }) => <em>{children}</em>,
  },
}

export default async function Home() {
  const [settings, gallery] = await Promise.all([
    sanityFetch<BioSettings>(bioSettingsQuery),
    sanityFetch<GalleryItem[]>(galleryItemsQuery),
  ])

  return (
    <main
      className="min-h-screen px-6 pb-16"
      style={{ paddingTop: 'max(4.5rem, env(safe-area-inset-top, 0px))' }}
    >
      <div className="w-full max-w-container mx-auto flex flex-col gap-12">

        {/* Header */}
        <header
          className="flex flex-col items-center gap-4 text-center animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          {settings?.portrait && (
            <Portrait image={settings.portrait} name={settings.name} />
          )}
          <div>
            <h1 className="font-display text-[1.75rem] font-bold text-ink leading-tight">
              {settings?.name}
            </h1>
            <p className="text-xs text-ink/60 mt-1 font-mono tracking-widest uppercase">
              {settings?.role}
            </p>
          </div>
          {settings?.locationCode && (
            <LocationPill code={settings.locationCode} />
          )}
        </header>

        {/* Bio */}
        {settings?.bio && (
          <section
            className="animate-fade-up text-sm font-mono max-w-[44ch] mx-auto text-center"
            style={{ animationDelay: '80ms' }}
          >
            <PortableText value={settings.bio} components={bioComponents} />
          </section>
        )}

        {/* Socials */}
        {settings?.socials && settings.socials.length > 0 && (
          <section
            className="animate-fade-up w-full"
            style={{ animationDelay: '160ms' }}
          >
            <Socials socials={settings.socials} />
          </section>
        )}

        {/* Currently */}
        {gallery && gallery.length > 0 && (
          <section
            className="animate-fade-up w-full"
            style={{ animationDelay: '240ms' }}
          >
            <Gallery items={gallery} />
          </section>
        )}

        {/* Footer */}
        <div className="animate-fade-up" style={{ animationDelay: '320ms' }}>
          <Footer copyrightYear={settings?.copyrightYear ?? '2025'} />
        </div>

      </div>
    </main>
  )
}
