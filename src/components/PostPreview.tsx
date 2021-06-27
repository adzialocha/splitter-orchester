import clsx from 'clsx';
import Link from 'next/link';
import React, { useMemo } from 'react';

import type { Audio, Image as ImageType } from 'sanity-schema';

import { randomItem } from '~/random';

import Box from '~/components/Box';
import Image from '~/components/Image';
import Paragraph from '~/components/Paragraph';
import { urlForImage } from '~/lib/sanity';

type Props = {
  alternativeTitle?: string;
  audio?: Audio;
  image?: ImageType;
  slug: string;
  text?: string;
  title: string;
  onClick: (audio: Audio) => void;
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
    <PostPreviewShape
      audio={props.audio}
      imageUrl={imageUrl}
      slug={props.slug}
      onClick={props.onClick}
    >
      <PostPreviewContent {...props} />
    </PostPreviewShape>
  );
}

function PostPreviewLink({
  audio,
  children,
  slug,
  className = '',
  isHiddenFirst,
  onClick,
}): JSX.Element {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(audio);
  };

  if (audio) {
    return (
      <a
        className={clsx('flex absolute inset-0', className, {
          'hover:opacity-100 opacity-0 transition-opacity': isHiddenFirst,
        })}
        href={`/${slug}`}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${slug}`}>
      <a
        className={clsx('flex absolute inset-0', className, {
          'hover:opacity-100 opacity-0 transition-opacity': isHiddenFirst,
        })}
      >
        {children}
      </a>
    </Link>
  );
}

function PostPreviewDefault({ imageUrl, className }): JSX.Element {
  return (
    <Box className={clsx('bg-white', className)}>
      {imageUrl && (
        <Image
          className="object-cover w-full h-full group-hover:opacity-0 transition-opacity"
          src={imageUrl}
        />
      )}
    </Box>
  );
}

function PostPreviewRhombus({
  children,
  slug,
  imageUrl,
  audio,
  onClick,
}): JSX.Element {
  return (
    <Box className="group relative shape-large">
      <PostPreviewDefault
        className="shape-large clip-rhombus"
        imageUrl={imageUrl}
      />
      <PostPreviewLink
        audio={audio}
        className="items-center"
        isHiddenFirst={!!imageUrl}
        slug={slug}
        onClick={onClick}
      >
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowUp({
  audio,
  children,
  slug,
  imageUrl,
  onClick,
}): JSX.Element {
  return (
    <Box className="group relative shape-medium">
      <PostPreviewDefault
        className="shape-medium clip-arrow-up"
        imageUrl={imageUrl}
      />
      <PostPreviewLink
        audio={audio}
        className="items-end"
        isHiddenFirst={!!imageUrl}
        slug={slug}
        onClick={onClick}
      >
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewArrowDown({
  audio,
  children,
  slug,
  imageUrl,
  onClick,
}): JSX.Element {
  return (
    <Box className="group relative shape-medium">
      <PostPreviewDefault
        className="shape-medium clip-arrow-down"
        imageUrl={imageUrl}
      />
      <PostPreviewLink
        audio={audio}
        isHiddenFirst={!!imageUrl}
        slug={slug}
        onClick={onClick}
      >
        {children}
      </PostPreviewLink>
    </Box>
  );
}

function PostPreviewContent({
  alternativeTitle,
  text,
  title,
}: Props): JSX.Element {
  return (
    <Box className="p-5 w-full text-center text-gray">
      <Paragraph>
        <strong>{alternativeTitle || title}</strong>
      </Paragraph>
      <Paragraph>{text && text}</Paragraph>
    </Box>
  );
}
