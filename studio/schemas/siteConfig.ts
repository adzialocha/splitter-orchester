import type { Rule } from '@sanity/validation';

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
      validation: (rule): typeof Rule => rule.max(7),
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
