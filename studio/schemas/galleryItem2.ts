import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { CaptionInput } from '../components/CaptionInput'

export const galleryItem2 = defineType({
  name: 'galleryItem2',
  title: 'Gallery Item 2',
  type: 'document',

  fields: [
    orderRankField({ type: 'galleryItem2' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
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
      return { title: title ?? 'Gallery Item 2', media }
    },
  },
})
