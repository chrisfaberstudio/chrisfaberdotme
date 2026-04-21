import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

export default defineConfig({
  name: 'chrisfaberdotme-cms',
  title: 'chrisfaberdotme CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
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
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'bioSettings'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemas },
})
