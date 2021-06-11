import type { Rule } from '@sanity/validation';

export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube / Vimeo video URL',
      validation: (rule): typeof Rule => rule.required(),
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      url: 'url',
    },
    prepare({ title, url }: { title: string; url: string }): { title: string } {
      return {
        title: title || url,
      };
    },
  },
};
