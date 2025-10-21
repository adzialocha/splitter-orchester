import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
// import webhooksTrigger after structureTool
import { webhooksTrigger } from 'sanity-plugin-webhooks-trigger';

import deskStructure from './deskStructure';
import resolveDocumentActions from './resolveDocumentActions';
import { schemaTypes } from './schemas/schema';

export default defineConfig({
  name: 'splitter-orchester-studio',
  title: 'Splitter Orchester',

  projectId: 'a8gjiary',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    webhooksTrigger({
      title: 'Deploy',
      text: 'Trigger Vercel deployment',
      encryptionSalt:
        process.env.SANITY_WEBHOOK_ENCRYPTION_SALT ||
        'replace-me-with-a-strong-string',
    }),
  ],

  document: {
    actions: resolveDocumentActions,
  },

  schema: {
    types: schemaTypes,
  },
});
