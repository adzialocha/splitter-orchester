import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import deskStructure from './deskStructure';
import resolveDocumentActions from './resolveDocumentActions';
import { schemaTypes } from './schemas/schema';

export default defineConfig({
  name: 'splitter-orchester-studio',
  title: 'Splitter Orchester',

  projectId: 'a8gjiary',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  document: {
    actions: resolveDocumentActions,
  },

  schema: {
    types: schemaTypes,
  },
});
