export default {
  name: 'audio',
  type: 'object',
  title: 'Audio',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'SoundCloud URL',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'caption',
    },
  },
};
