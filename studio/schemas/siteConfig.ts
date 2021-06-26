import type { Rule } from '@sanity/validation';

export default {
  name: 'siteConfig',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      title: 'Main image',
      description: 'This image will be displayed on the homepage',
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Main Navigation',
      name: 'mainNavigation',
      description: 'Select items for the top navigation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
      validation: (rule): typeof Rule => rule.max(8),
    },
    {
      title: 'Footer Navigation',
      name: 'footerNavigation',
      description: 'Select items for the bottom navigation',
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
