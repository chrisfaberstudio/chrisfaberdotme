'use client'

export function MoreAboutButton() {
  return (
    <button
      onClick={() =>
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-wider border border-ink/20 text-ink/60 rounded-full hover:border-ink/40 hover:text-ink/80 active:border-ink active:text-ink transition-colors duration-200"
    >
      More about me
    </button>
  )
}
