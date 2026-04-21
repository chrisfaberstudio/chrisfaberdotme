/**
 * Seed script — populates the Sanity dataset with placeholder content.
 *
 * Prerequisites:
 *   1. Copy .env.example → .env.local and fill in your project ID + write token
 *   2. npm run seed
 *
 * Safe to re-run: bioSettings uses createOrReplace; gallery items are
 * created fresh each run (delete them manually in the Studio if needed).
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadFromUrl(url: string, filename: string) {
  console.log(`  Uploading ${filename}…`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  return client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
}

function imageRef(assetId: string) {
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: assetId },
    hotspot: { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
    crop: { top: 0, bottom: 0, left: 0, right: 0 },
  }
}

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
    process.exit(1)
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Missing SANITY_API_WRITE_TOKEN in .env.local')
    process.exit(1)
  }

  console.log('Seeding Sanity dataset…\n')

  // Portrait
  console.log('Portrait:')
  const portrait = await uploadFromUrl(
    'https://picsum.photos/seed/cfportrait/400/400',
    'portrait.jpg'
  )

  // OG image
  console.log('OG image:')
  const ogImage = await uploadFromUrl(
    'https://picsum.photos/seed/cfog/1200/630',
    'og-image.jpg'
  )

  // bioSettings (singleton — fixed document ID)
  await client.createOrReplace({
    _id: 'bioSettings',
    _type: 'bioSettings',
    name: 'Chris Faber',
    role: 'Computergraphics Artist',
    portrait: imageRef(portrait._id),
    bio: [
      {
        _type: 'block',
        _key: 'bio1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Building worlds between pixels and light.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'bio2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Based between Uluwatu and Munich. Available for selected projects.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    locationCode: 'ULUWATU',
    socials: [
      { _key: 's1', platform: 'instagram', url: 'https://instagram.com/chrisfaberstudio', label: 'Instagram' },
      { _key: 's2', platform: 'threads', url: 'https://threads.net/@chrisfaberstudio', label: 'Threads' },
      { _key: 's3', platform: 'linkedin', url: 'https://linkedin.com/in/chrisfaber', label: 'LinkedIn' },
      { _key: 's4', platform: 'email', url: 'chrisfaber@me.com', label: 'Email' },
    ],
    imprint: [
      'Chris Faber',
      'Responsible for content per § 55 Abs. 2 RStV:',
      '',
      'Chris Faber',
      'Uluwatu, Bali',
      'Indonesia',
      '',
      'Contact: chrisfaber@me.com',
    ].join('\n'),
    dataPrivacy: [
      'This website does not use cookies and does not collect personal data.',
      '',
      'External links are provided as a convenience and open in a new tab.',
      'We are not responsible for the content of external websites.',
      '',
      'Images are served via the Sanity CDN (cdn.sanity.io).',
      '',
      'For questions about data privacy, contact: chrisfaber@me.com',
    ].join('\n'),
    copyrightYear: '2025',
    seo: {
      title: 'Chris Faber',
      description: 'Computergraphics artist based between Uluwatu and Munich.',
      ogImage: imageRef(ogImage._id),
    },
  })
  console.log('\n✓ bioSettings created')

  // Gallery items
  const gallerySeeds = [
    { seed: 'cf-bali1', caption: 'Uluwatu cliffs at dusk', daysAgo: 0 },
    { seed: 'cf-ocean1', caption: 'Indian Ocean', daysAgo: 7 },
    { seed: 'cf-render1', caption: 'Untitled render', daysAgo: 14 },
    { seed: 'cf-light1', caption: 'Golden hour', daysAgo: 21 },
    { seed: 'cf-munich1', caption: 'Munich winter', daysAgo: 28 },
    { seed: 'cf-studio1', caption: 'Studio session', daysAgo: 35 },
    { seed: 'cf-abstract1', caption: 'Study in form', daysAgo: 42 },
    { seed: 'cf-travel1', caption: 'In transit', daysAgo: 49 },
  ]

  console.log('\nGallery items:')
  for (const item of gallerySeeds) {
    const asset = await uploadFromUrl(
      `https://picsum.photos/seed/${item.seed}/800/800`,
      `gallery-${item.seed}.jpg`
    )
    const date = new Date()
    date.setDate(date.getDate() - item.daysAgo)

    await client.create({
      _type: 'galleryItem',
      image: imageRef(asset._id),
      caption: item.caption,
      date: date.toISOString(),
      visible: true,
    })
    console.log(`  ✓ ${item.caption}`)
  }

  console.log('\nSeeding complete!')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
