import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { bioSettingsQuery } from '@/lib/queries'
import type { BioSettings } from '@/lib/types'

export const metadata: Metadata = { title: 'Data Privacy' }

export default async function PrivacyPage() {
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
        <h1 className="font-display text-[1.75rem] font-bold mt-8 mb-6">Data Privacy</h1>
        <div className="text-sm text-ink/70 font-mono leading-relaxed whitespace-pre-wrap">
          {settings?.dataPrivacy}
        </div>
      </div>
    </main>
  )
}
