import type { LucideIcon } from 'lucide-react'
import { Instagram, Linkedin, AtSign, Mail, Link, Video, ArrowUpRight } from 'lucide-react'
import type { Social, SocialPlatform } from '@/lib/types'

function WhatsAppIcon({ size = 16, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Speech bubble with tail at bottom-left — WhatsApp outer shape */}
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      {/* Phone receiver inside bubble */}
      <path d="M15.1 14.9c-.3.5-.8 1.1-1.4 1.2-.6.1-1.1-.1-2.5-.7-1.5-.6-2.8-2.4-3-2.6-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4.1.6.6l.7 1.6c.1.2.1.5 0 .7-.1.2-.2.3-.3.5-.1.2-.2.3-.1.5.1.2.5.8 1.1 1.4.7.7 1.3 1 1.5 1.1.2.1.4.1.5-.1.1-.2.5-.6.7-.8.2-.2.4-.3.6-.2l1.7.8c.2.1.4.2.5.4.1.3 0 .7-.3 1.1z" />
    </svg>
  )
}

type IconType = LucideIcon | typeof WhatsAppIcon

const ICONS: Record<SocialPlatform, IconType> = {
  instagram: Instagram,
  threads: AtSign,
  linkedin: Linkedin,
  email: Mail,
  whatsapp: WhatsAppIcon,
  calendar: Video,
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
              className="group flex items-center gap-3 w-full min-h-[56px] px-4 border border-ink/20 text-ink/70 hover:border-ink hover:bg-ink hover:text-bg active:border-ink active:bg-ink active:text-bg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
