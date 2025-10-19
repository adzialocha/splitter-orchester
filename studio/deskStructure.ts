import { StructureBuilder } from 'sanity/structure';

export default (S: StructureBuilder) =>
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
