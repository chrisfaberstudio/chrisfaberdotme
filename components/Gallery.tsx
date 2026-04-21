import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'
import type { GalleryItem } from '@/lib/types'

export function Gallery({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null

  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      {items.map((item) => {
        const src = urlFor(item.image)?.width(800).auto('format').url() ?? ''
        if (!src) return null
        return (
          <figure key={item._id} className="min-w-0">
            <Image
              src={src}
              alt={item.caption ?? ''}
              width={800}
              height={800}
              className="w-full h-auto object-cover"
            />
            {item.caption && (
              <figcaption className="mt-1 text-[10px] font-mono text-ink/50 tracking-widest uppercase leading-snug">
                {item.caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
