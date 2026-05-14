import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { CaptionInput } from '../components/CaptionInput'

export const galleryItem3 = defineType({
  name: 'galleryItem3',
  title: 'Gallery Item 3',
  type: 'document',

  fields: [
    orderRankField({ type: 'galleryItem3' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload an image. Use either Image or Video — not both.',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Upload a video. It will loop silently. Use either Image or Video — not both.',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Defaults to the image filename. You can edit or clear it.',
      components: { input: CaptionInput },
    }),
    defineField({
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { media: 'image', title: 'caption' },
    prepare({ media, title }) {
      return { title: title ?? 'Gallery Item 3', media }
    },
  },
})
