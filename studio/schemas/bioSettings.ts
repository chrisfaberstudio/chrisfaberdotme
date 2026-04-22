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
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Book a Call', value: 'calendar' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link',
              description: 'URL (https://…), email address, or for WhatsApp: https://wa.me/YOURNUMBER (e.g. https://wa.me/491234567890)',
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
      title: 'About 1',
      description: 'Longer about section displayed below Gallery 1 on the main page.',
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
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'about2',
      title: 'About 2',
      description: 'Longer about section displayed below Gallery 2 on the main page.',
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
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'imprint',
      title: 'Imprint',
      description: 'Legal imprint shown on the Imprint page. Highlight text and click the link icon to add links.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
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
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'dataPrivacy',
      title: 'Dataprivacy',
      description: 'Privacy policy shown on the Dataprivacy page. Highlight text and click the link icon to add links.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
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
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
})
