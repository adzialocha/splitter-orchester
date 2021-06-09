export default {
  name: 'video',
  type: 'object',
  title: 'Video Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube / Vimeo video URL',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Video caption',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
};
