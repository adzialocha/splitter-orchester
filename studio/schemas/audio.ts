export default {
  name: 'audio',
  type: 'object',
  title: 'Audio',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'SoundCloud URL',
      validation: (Rule): any => Rule.required(),
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
