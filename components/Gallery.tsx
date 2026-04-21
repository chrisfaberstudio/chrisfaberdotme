import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'
import type { GalleryItem } from '@/lib/types'

export function Gallery({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null

  return (
    <div
      className="w-full overflow-x-auto scrollbar-none"
      style={{
        maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
      }}
    >
      <ul
        className="flex gap-3 pb-1"
        role="list"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item) => {
          const src = urlFor(item.image).width(440).height(440).auto('format').fit('crop').url()
          return (
            <li
              key={item._id}
              className="shrink-0 w-[220px] aspect-square overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={src}
                alt={item.caption ?? ''}
                width={220}
                height={220}
                className="object-cover w-full h-full"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
