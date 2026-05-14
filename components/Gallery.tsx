import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'
import type { GalleryItem } from '@/lib/types'

export function Gallery({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null

  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      {items.map((item) => {
        const isVideo = !!item.videoUrl

        return (
          <figure key={item._id} className="min-w-0">
            {isVideo ? (
              <video
                src={item.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            ) : item.image ? (
              <Image
                src={urlFor(item.image)?.width(800).auto('format').url() ?? ''}
                alt={item.caption ?? ''}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            ) : null}
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
