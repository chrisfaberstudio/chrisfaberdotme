'use client'

import { useState, useEffect } from 'react'

export const LOCATION_MAP = {
  ULUWATU: { label: 'Uluwatu', timezone: 'Asia/Makassar' },
  MUNICH: { label: 'Munich', timezone: 'Europe/Berlin' },
} as const

export type LocationCode = keyof typeof LOCATION_MAP

function formatTime(timezone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
    hour12: false,
  }).format(new Date())
}

export function useLocationTime(code: LocationCode): { label: string; time: string } {
  const { label, timezone } = LOCATION_MAP[code]
  // SSR-safe: render placeholder on server, fill on client to avoid hydration mismatch
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    setTime(formatTime(timezone))
    const id = setInterval(() => setTime(formatTime(timezone)), 60_000)
    return () => clearInterval(id)
  }, [timezone])

  return { label, time }
}
