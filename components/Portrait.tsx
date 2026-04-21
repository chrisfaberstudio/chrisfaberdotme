import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'
import type { SanityImage } from '@/lib/types'

interface PortraitProps {
  image: SanityImage
  name: string
}

export function Portrait({ image, name }: PortraitProps) {
  const src = urlFor(image).width(224).height(224).auto('format').fit('crop').url()

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-ink/10 shrink-0">
      <Image
        src={src}
        alt={name}
        width={112}
        height={112}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  )
}
