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
  ],
};
