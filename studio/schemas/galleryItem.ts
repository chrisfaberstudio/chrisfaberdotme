import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',

  fields: [
    orderRankField({ type: 'galleryItem' }),
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
      description: 'Optional caption displayed below the image.',
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
      return { title: title ?? 'Gallery Item', media }
    },
  },
})
