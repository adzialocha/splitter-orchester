export default {
  name: 'siteConfig',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      title: 'Main Navigation',
      name: 'mainNavigation',
      description: 'Select items for the main navigation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
    {
      title: 'Footer Navigation',
      name: 'footerNavigation',
      description: 'Select items for the footer navigation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
  ],
};
