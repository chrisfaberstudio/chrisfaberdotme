import { defineType, defineField } from 'sanity'

export const bioSettings = defineType({
  name: 'bioSettings',
  title: 'Bio Settings',
  type: 'document',
  // Prevent creating more than one instance
  __experimental_actions: ['update', 'publish'],

  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Text shown in the browser tab. Defaults to Name if left empty.',
    }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (R) => R.required() }),

    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),

    defineField({
      name: 'locationCode',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Uluwatu', value: 'ULUWATU' },
          { title: 'Munich', value: 'MUNICH' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Threads', value: 'threads' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Email', value: 'email' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL or Email Address',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'platform' },
          },
        },
      ],
    }),

    defineField({
      name: 'about',
      title: 'About',
      description: 'Longer about section displayed below the gallery on the main page.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),

    defineField({ name: 'imprint', title: 'Imprint', type: 'text', rows: 6 }),
    defineField({ name: 'dataPrivacy', title: 'Data Privacy', type: 'text', rows: 8 }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright Year',
      type: 'string',
      initialValue: () => new Date().getFullYear().toString(),
    }),

  ],

  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
})
