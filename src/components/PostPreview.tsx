import clsx from 'clsx';
import Link from 'next/link';
import React, { useMemo } from 'react';

import type { Audio, Image } from 'sanity-schema';

import { randomItem } from '~/random';

import Box from '~/components/Box';
import Paragraph from '~/components/Paragraph';
import { urlForImage } from '~/lib/sanity';

type Props = {
  alternativeTitle?: string;
  audio?: Audio;
  image?: Image;
  slug: string;
  text?: string;
  title: string;
};

export default function PostPreview(props: Props): JSX.Element {
  const PostPreviewShape = useMemo(() => {
    return randomItem([
      PostPreviewRhombus,
      PostPreviewArrowUp,
      PostPreviewArrowDown,
    ]);
  }, []);

  const imageUrl = props.image && urlForImage(props.image).url();

  return (
    <PostPreviewShape imageUrl={imageUrl} slug={props.slug}>
      <PostPreviewContent {...props} />
    </PostPreviewShape>
  );
}

function PostPreviewLink({ children, slug, className }): JSX.Element {
  return (
    <Link href={`/${slug}`}>
      <a className={className}>{children}</a>
    </Link>
  );
}

function PostPreviewDefault({ imageUrl, className }): JSX.Element {
  return (
    <Box
      className={clsx(className, {
        'bg-white': !imageUrl,
        'bg-center bg-no-repeat bg-cover': imageUrl,
      })}
      style={{ backgroundImage: imageUrl && `url(${imageUrl})` }}
    />
  );
}

function PostPreviewRhombus({ children, slug, imageUrl }): JSX.Element {
  return (
    <Box className="relative shape-large">
      <PostPreviewDefault
        className="shape-large clip-rhombus"
        imageUrl={imageUrl}
      />
      <PostPreviewLink
        className="flex absolute inset-0 items-center"
        slug={slug}
      >
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowUp({ children, slug, imageUrl }): JSX.Element {
  return (
    <Box className="relative shape-medium">
      <PostPreviewDefault
        className="shape-medium clip-arrow-up"
        imageUrl={imageUrl}
      />
      <PostPreviewLink className="flex absolute inset-0 items-end" slug={slug}>
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowDown({ children, slug, imageUrl }): JSX.Element {
  return (
    <Box className="relative shape-medium">
      <PostPreviewDefault
        className="shape-medium clip-arrow-down"
        imageUrl={imageUrl}
      />
      <PostPreviewLink className="flex absolute inset-0" slug={slug}>
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewContent({
  alternativeTitle,
  audio,
  image,
  text,
  title,
}: Props): JSX.Element {
  return (
    <Box className="p-5 w-full text-center text-gray">
      <strong>{alternativeTitle || title}</strong>
      <Paragraph>{text && text}</Paragraph>
    </Box>
  );
}
