import * as SanityBlockContent from '@sanity/block-content-to-react';
import React from 'react';

import type { BlockContent as BlockContentSchema } from 'sanity-schema';

import EmbedVideo from '~/components/EmbedVideo';

type Props = {
  blocks: BlockContentSchema;
};

const serializers = {
  types: {
    video: BlockContentVideo,
  },
};

const imageOptions = {
  width: 1200,
  height: 600,
  fit: 'max',
};

export default function BlockContent({ blocks }: Props): JSX.Element {
  return (
    <SanityBlockContent
      blocks={blocks}
      imageOptions={imageOptions}
      serializers={serializers}
    />
  );
}

function BlockContentVideo({ node }): JSX.Element {
  return <EmbedVideo url={node.url} />;
}
