import BlockContent from '@sanity/block-content-to-react';
import React from 'react';

import type { BlockContent as BlockContentSchema } from 'sanity-schema';

import EmbedVideo from '~/components/EmbedVideo';
import Link from '~/components/Link';
import Section from '~/components/Section';

type Props = {
  blocks: BlockContentSchema;
};

const markSerializers = {
  link: BlockContentLink,
};

const serializers = {
  types: {
    video: BlockContentVideo,
  },
  container: BlockContentContainer,
  marks: markSerializers,
};

const imageOptions = {
  width: 1200,
  height: 600,
  fit: 'max',
};

export default function SanityBlockContent({ blocks }: Props): JSX.Element {
  return (
    <BlockContent
      blocks={blocks}
      imageOptions={imageOptions}
      serializers={serializers}
    />
  );
}

function BlockContentLink({ children, mark }): JSX.Element {
  return (
    <Link href={mark.href} className="underline">
      {children}
    </Link>
  );
}

function BlockContentContainer({ children }): JSX.Element {
  return <Section>{children}</Section>;
}

function BlockContentVideo({ node }): JSX.Element {
  return <EmbedVideo url={node.url} caption={node.caption} />;
}
