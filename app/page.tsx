import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity'
import { bioSettingsQuery, galleryItemsQuery } from '@/lib/queries'
import type { BioSettings, GalleryItem } from '@/lib/types'
import { Portrait } from '@/components/Portrait'
import { LocationPill } from '@/components/LocationPill'
import { Socials } from '@/components/Socials'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'
import { MoreAboutButton } from '@/components/MoreAboutButton'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<BioSettings>(bioSettingsQuery)
  return {
    title: settings?.siteTitle ?? settings?.name ?? 'Chris Faber',
    description: '',
  }
}

const aboutComponents = {
  block: {
    normal: ({ children }: { children?: import('react').ReactNode }) => (
      <p className="mb-4 last:mb-0 text-ink/70 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: import('react').ReactNode }) => (
      <h2 className="font-display text-lg font-bold text-ink mt-8 mb-3 first:mt-0">{children}</h2>
    ),
  },
  list: {
    bullet: ({ children }: { children?: import('react').ReactNode }) => (
      <ul className="list-disc list-outside pl-4 mb-4 space-y-1 text-ink/70">{children}</ul>
    ),
    number: ({ children }: { children?: import('react').ReactNode }) => (
      <ol className="list-decimal list-outside pl-4 mb-4 space-y-1 text-ink/70">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: import('react').ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: import('react').ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: import('react').ReactNode }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    em: ({ children }: { children?: import('react').ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children?: import('react').ReactNode }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="underline underline-offset-2 text-ink hover:text-ink/60 transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
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
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-display text-[1.75rem] font-black text-ink leading-tight">
              {settings?.name}
            </h1>
            <p className="text-xs text-ink/60 font-mono tracking-widest uppercase">
              {settings?.role}
            </p>
            {settings?.locationCode && (
              <LocationPill code={settings.locationCode} />
            )}
          </div>
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

        {/* More about me */}
        {settings?.about && settings.about.length > 0 && (
          <div
            className="animate-fade-up flex justify-center"
            style={{ animationDelay: '120ms' }}
          >
            <MoreAboutButton />
          </div>
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

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section
            className="animate-fade-up w-full"
            style={{ animationDelay: '240ms' }}
          >
            <Gallery items={gallery} />
          </section>
        )}

        {/* About */}
        {settings?.about && settings.about.length > 0 && (
          <section
            id="about"
            className="animate-fade-up w-full text-sm font-mono scroll-mt-16"
            style={{ animationDelay: '320ms' }}
          >
            <PortableText value={settings.about} components={aboutComponents} />
          </section>
        )}

        {/* Footer */}
        <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
          <Footer />
        </div>

      </div>
    </main>
  )
}
