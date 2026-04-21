import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'otichdwa',
    dataset: 'production',
  },
  studioHost: 'chrisfaberdotme',
  autoUpdates: false,
})
