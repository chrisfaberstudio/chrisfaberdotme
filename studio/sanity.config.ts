import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemas } from './schemas'

export default defineConfig({
  name: 'chrisfaberme',
  title: 'ChrisFaber\u25CFme',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Bio Settings')
              .id('bioSettings')
              .child(
                S.document()
                  .schemaType('bioSettings')
                  .documentId('bioSettings')
              ),
            S.divider(),
            orderableDocumentListDeskItem({ type: 'galleryItem', title: 'Gallery 1', S, context }),
            orderableDocumentListDeskItem({ type: 'galleryItem2', title: 'Gallery 2', S, context }),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemas },
})
