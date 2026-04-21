import Link from 'next/link'

export function Footer({ copyrightYear }: { copyrightYear: string }) {
  return (
    <footer className="flex items-center justify-center gap-2 text-[10px] text-ink/40 font-mono tracking-widest uppercase">
      <span>© {copyrightYear} Chris Faber</span>
      <span aria-hidden>·</span>
      <Link
        href="/imprint"
        className="hover:text-ink/70 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Imprint
      </Link>
      <span aria-hidden>·</span>
      <Link
        href="/privacy"
        className="hover:text-ink/70 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Privacy
      </Link>
    </footer>
  )
}
