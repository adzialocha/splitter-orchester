import BlockContent from '@sanity/block-content-to-react';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import type { BlockContent as BlockContentSchema } from 'sanity-schema';

import EmbedAudio from '~/components/EmbedAudio';
import EmbedVideo from '~/components/EmbedVideo';
import HeadingWithSymbol from '~/components/HeadingWithSymbol';
import Paragraph from '~/components/Paragraph';
import SanityImage from '~/components/SanityImage';
import Section from '~/components/Section';

type Props = {
  blocks: BlockContentSchema;
};

const markSerializers = {
  link: BlockContentExternalLink,
  internalLink: BlockContentLink,
};

const serializers = {
  types: {
    audio: BlockContentAudio,
    video: BlockContentVideo,
    block: BlockContentBlock,
    image: BlockContentImage,
  },
  container: BlockContentContainer,
  marks: markSerializers,
};

const imageOptions = {
  width: 1200,
  height: 1200,
  fit: 'max',
};

// Helper method to add class names to blocks indicating how they should be
// layouted
function sectionClassNames(node) {
  const isOdd = node.indexSection % 2 === 1;
  return isOdd ? 'md:block-content-odd' : 'md:block-content-even';
}

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
  const { slug = {} } = mark;

  if (!slug.current) {
    return children;
  }

  return (
    <Link href={`/${slug.current}`}>
      <a className="underline">{children}</a>
    </Link>
  );
}

function BlockContentExternalLink({ children, mark }): JSX.Element {
  if (!mark.href) {
    return children;
  }

  return (
    <Link href={mark.href}>
      <a className="underline" target="_blank">
        {children}
      </a>
    </Link>
  );
}

function BlockContentContainer({ children }): JSX.Element {
  return <Section className="mb-5">{children}</Section>;
}

function BlockContentAudio({ node }): JSX.Element {
  return (
    <EmbedAudio
      caption={node.caption}
      className={sectionClassNames(node)}
      url={node.url}
    />
  );
}

function BlockContentVideo({ node }): JSX.Element {
  return (
    <EmbedVideo
      caption={node.caption}
      className={sectionClassNames(node)}
      url={node.url}
    />
  );
}

function BlockContentBlock({ node, children }): JSX.Element {
  const style = node.style || 'normal';

  if (/^h\d/.test(style)) {
    return (
      <BlockContentHeading
        className={sectionClassNames(node)}
        indexSection={node.indexSection}
        level={style}
        totalSections={node.totalSections}
      >
        {children}
      </BlockContentHeading>
    );
  }

  if (style === 'blockquote') {
    return (
      <BlockContentQuote className={sectionClassNames(node)}>
        {children}
      </BlockContentQuote>
    );
  }

  return (
    <BlockContentParagraph className={sectionClassNames(node)}>
      {children}
    </BlockContentParagraph>
  );
}

function BlockContentHeading({
  children,
  className,
  indexSection,
  level,
  totalSections,
}): JSX.Element {
  const isLast = indexSection === totalSections;
  const isOdd = indexSection % 2 === 1;

  return (
    <HeadingWithSymbol
      className={className}
      headingLevel={level}
      isLast={isLast}
      isOdd={isOdd}
    >
      {children}
    </HeadingWithSymbol>
  );
}

function BlockContentQuote({ children, className }): JSX.Element {
  return (
    <blockquote
      className={clsx('pl-5 my-5 italic border-l-2 border-white', className)}
    >
      {children}
    </blockquote>
  );
}

function BlockContentParagraph({ children, className }): JSX.Element {
  return <Paragraph className={clsx('my-5', className)}>{children}</Paragraph>;
}

function BlockContentImage(props): JSX.Element {
  if (!props.node.asset) {
    return null;
  }

  return (
    <figure className={clsx('my-8 md:my-16', sectionClassNames(props.node))}>
      <SanityImage className="m-auto" source={props.node} />
    </figure>
  );
}
