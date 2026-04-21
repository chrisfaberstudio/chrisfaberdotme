import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'
import type { SanityImage } from '@/lib/types'

interface PortraitProps {
  image: SanityImage
  name: string
}

export function Portrait({ image, name }: PortraitProps) {
  const src = urlFor(image)?.width(336).height(336).auto('format').fit('crop').url()
  if (!src) return null

  return (
    <div className="w-36 h-36 rounded-full overflow-hidden ring-1 ring-ink/10 shrink-0">
      <Image
        src={src}
        alt={name}
        width={168}
        height={168}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  )
}
