import type { LucideIcon } from 'lucide-react'
import { Instagram, Linkedin, AtSign, Mail, Link, Phone, ArrowUpRight } from 'lucide-react'
import type { Social, SocialPlatform } from '@/lib/types'

const ICONS: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  threads: AtSign,
  linkedin: Linkedin,
  email: Mail,
  whatsapp: Phone,
  other: Link,
}

export function Socials({ socials }: { socials: Social[] }) {
  return (
    <ul className="flex flex-col gap-2 w-full" role="list">
      {socials.map((social) => {
        const Icon = ICONS[social.platform]
        const isEmail = social.platform === 'email'
        const href = isEmail ? `mailto:${social.url}` : social.url

        return (
          <li key={social._key}>
            <a
              href={href}
              target={isEmail ? undefined : '_blank'}
              rel={isEmail ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-3 w-full min-h-[56px] px-4 border border-ink/20 text-ink/70 hover:border-ink hover:bg-ink hover:text-bg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Icon size={16} strokeWidth={1.5} className="shrink-0" />
              <span className="flex-1 text-xs font-mono tracking-widest uppercase">{social.label}</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-150"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
