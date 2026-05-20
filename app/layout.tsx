import type { Metadata } from 'next'
import { Inter, Lato, Roboto_Mono } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: {
    default: 'Chris Faber',
    template: '%s · Chris Faber',
  },
  description: 'Computer Graphics Artist – Exploring the beauty of form, surface and light.',
  metadataBase: new URL('https://chrisfaber.me'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
  },
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
