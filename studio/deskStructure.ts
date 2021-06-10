import S from '@sanity/desk-tool/structure-builder';

import type { ListItem } from '@sanity/desk-tool/structure-builder';

export default (): ListItem[] =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Navigation')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('defaultSiteConfig')
            .title('Navigation'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteConfig'].includes(listItem.getId()),
      ),
    ]);
