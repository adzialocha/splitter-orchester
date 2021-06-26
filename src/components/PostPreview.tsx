import Link from 'next/link';
import React, { useMemo } from 'react';

import type { Audio, Image } from 'sanity-schema';

import { randomItem } from '~/random';

import Box from '~/components/Box';

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
      PostPreviewTrapez,
      PostPreviewArrowUp,
      PostPreviewArrowDown,
    ]);
  }, []);

  return (
    <PostPreviewShape slug={props.slug}>
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

function PostPreviewTrapez({ children, slug }): JSX.Element {
  return (
    <Box className="relative w-64 h-112">
      <Box className="w-64 h-56 bg-white clip-arrow-up" />
      <Box className="w-64 h-56 bg-white clip-arrow-down" />
      <PostPreviewLink
        className="flex absolute z-10 inset-0 items-center"
        slug={slug}
      >
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowUp({ children, slug }): JSX.Element {
  return (
    <Box className="relative w-64 h-56">
      <Box className="w-64 h-56 bg-white clip-arrow-up" />
      <PostPreviewLink className="flex absolute z-10 inset-0 items-end" slug={slug}>
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowDown({ children, slug }): JSX.Element {
  return (
    <Box className="relative w-64 h-56">
      <Box className="w-64 h-56 bg-white clip-arrow-down" />
      <PostPreviewLink className="flex absolute z-10 inset-0" slug={slug}>
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
      {alternativeTitle || title}
      {text && text}
    </Box>
  );
}
