import S from '@sanity/desk-tool/structure-builder';

import type { ListItem } from '@sanity/desk-tool/structure-builder';

export default (): ListItem[] =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Website')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('defaultSiteConfig')
            .title('Website'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteConfig'].includes(listItem.getId()),
      ),
    ]);
