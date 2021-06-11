import type { Rule } from '@sanity/validation';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule): typeof Rule => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule): typeof Rule => rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      validation: (rule): typeof Rule => rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'feature',
      title: 'Feature',
      type: 'object',
      description:
        'Feature this post on the homepage with an image and / or audio file',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'audio',
          title: 'Audio',
          type: 'audio',
        },
        {
          name: 'isFeatured',
          title: 'Visible on homepage',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
};
