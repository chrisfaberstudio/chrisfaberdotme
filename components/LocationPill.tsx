'use client'

import { useLocationTime } from '@/lib/location'
import type { LocationCode } from '@/lib/types'

export function LocationPill({ code }: { code: LocationCode }) {
  const { label, time } = useLocationTime(code)

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-wider border border-ink/20 text-ink/60 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
      <span className="uppercase">{label}</span>
      <span className="text-ink/30" aria-hidden>·</span>
      <time>{time}</time>
    </span>
  )
}
