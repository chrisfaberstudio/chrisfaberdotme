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
  description: 'Computergraphics artist based between Uluwatu and Munich.',
  metadataBase: new URL('https://chrisfaber.me'),
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
