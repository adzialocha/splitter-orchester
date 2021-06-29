import BlockContent from '@sanity/block-content-to-react';
import Link from 'next/link';
import React from 'react';

import type { BlockContent as BlockContentSchema } from 'sanity-schema';

import EmbedAudio from '~/components/EmbedAudio';
import EmbedVideo from '~/components/EmbedVideo';
import Section from '~/components/Section';

type Props = {
  blocks: BlockContentSchema;
};

const markSerializers = {
  link: BlockContentLink,
};

const serializers = {
  types: {
    audio: BlockContentAudio,
    video: BlockContentVideo,
  },
  container: BlockContentContainer,
  marks: markSerializers,
};

const imageOptions = {
  width: 1200,
  height: 1200,
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
    <Link href={mark.href}>
      <a className="underline">{children}</a>
    </Link>
  );
}

function BlockContentContainer({ children }): JSX.Element {
  return <Section className="mb-5 block-content">{children}</Section>;
}

function BlockContentAudio({ node }): JSX.Element {
  return <EmbedAudio caption={node.caption} url={node.url} />;
}

function BlockContentVideo({ node }): JSX.Element {
  return <EmbedVideo caption={node.caption} url={node.url} />;
}
