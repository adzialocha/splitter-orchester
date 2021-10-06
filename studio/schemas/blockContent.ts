export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            title: 'Post link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Post',
                to: [{ type: 'post' }],
                options: {
                  weak: true,
                },
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
    {
      type: 'video',
    },
    {
      type: 'audio',
    },
  ],
};
