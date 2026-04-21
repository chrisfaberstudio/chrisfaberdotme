'use client'

import { useLocationTime } from '@/lib/location'
import type { LocationCode } from '@/lib/types'

export function LocationPill({ code }: { code: LocationCode }) {
  const { label, time } = useLocationTime(code)

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-ink">
      <span className="uppercase">{label}</span>
      <span className="text-ink/30" aria-hidden>·</span>
      <time>{time}</time>
    </span>
  )
}
