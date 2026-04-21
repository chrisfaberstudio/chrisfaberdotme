import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity'
import { bioSettingsQuery } from '@/lib/queries'
import type { BioSettings } from '@/lib/types'

export const metadata: Metadata = { title: 'Imprint' }

const imprintComponents = {
  block: {
    normal: ({ children }: { children?: import('react').ReactNode }) => (
      <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: import('react').ReactNode }) => (
      <h2 className="font-display text-lg font-bold text-ink mt-8 mb-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: { children?: import('react').ReactNode }) => (
      <h3 className="font-display text-base font-bold text-ink mt-6 mb-2 first:mt-0">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: import('react').ReactNode }) => (
      <ul className="list-disc list-outside pl-4 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: import('react').ReactNode }) => (
      <ol className="list-decimal list-outside pl-4 mb-4 space-y-1">{children}</ol>
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

export default async function ImprintPage() {
  const settings = await sanityFetch<BioSettings>(bioSettingsQuery)

  return (
    <main
      className="min-h-screen px-6 pb-16"
      style={{ paddingTop: 'max(4.5rem, env(safe-area-inset-top, 0px))' }}
    >
      <div className="w-full max-w-container mx-auto">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-widest text-ink/40 font-mono hover:text-ink/70 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          ← Back
        </Link>
        <h1 className="font-display text-[1.75rem] font-bold mt-8 mb-6">Imprint</h1>
        <div className="text-sm text-ink/70 font-mono leading-relaxed">
          {settings?.imprint && (
            <PortableText value={settings.imprint} components={imprintComponents} />
          )}
        </div>
      </div>
    </main>
  )
}
