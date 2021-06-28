import clsx from 'clsx';
import Link from 'next/link';
import React, { useMemo } from 'react';

import type { Audio, Image as ImageType } from 'sanity-schema';

import { randomItem } from '~/random';

import Box from '~/components/Box';
import Paragraph from '~/components/Paragraph';
import SanityImage from '~/components/SanityImage';

type Props = {
  alternativeTitle?: string;
  audio?: Audio;
  image?: ImageType;
  slug: string;
  text?: string;
  title: string;
  onClick: (audio: Audio) => void;
};

const RANDOM_SHAPES = [
  {
    classNameShape: 'shape-large',
    classNameClip: 'clip-rhombus',
    classNameLink: 'items-center',
  },
  {
    classNameShape: 'shape-medium',
    classNameClip: 'clip-arrow-up',
    classNameLink: 'items-end',
  },
  {
    classNameShape: 'shape-medium',
    classNameClip: 'clip-arrow-down',
    classNameLink: 'items-start',
  },
];

export default function FeaturedPostsItem(props: Props): JSX.Element {
  const shapeProps = useMemo(() => {
    return randomItem(RANDOM_SHAPES);
  }, []);

  return (
    <FeaturedPostsItemContainer
      {...shapeProps}
      audio={props.audio}
      image={props.image}
      slug={props.slug}
      onClick={props.onClick}
    >
      <FeaturedPostsItemContent {...props} />
    </FeaturedPostsItemContainer>
  );
}

function FeaturedPostsItemContainer({
  children,
  classNameLink,
  classNameShape,
  classNameClip,
  slug,
  image,
  audio,
  onClick,
}): JSX.Element {
  return (
    <Box className={clsx('group relative', classNameShape)}>
      <FeaturedPostsItemShape
        className={clsx(classNameShape, classNameClip)}
        image={image}
      />
      <FeaturedPostsItemLink
        audio={audio}
        className={classNameLink}
        isHiddenFirst={!!image}
        slug={slug}
        onClick={onClick}
      >
        {children}
      </FeaturedPostsItemLink>
    </Box>
  );
}

function FeaturedPostsItemShape({ image, className }): JSX.Element {
  return (
    <Box className={clsx('bg-white', className)}>
      {image && (
        <SanityImage
          className="object-cover w-full h-full group-hover:opacity-0 transition-opacity"
          source={image}
        />
      )}
    </Box>
  );
}

function FeaturedPostsItemLink({
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

  const classNameLink = clsx('flex absolute inset-0', className, {
    'hover:opacity-100 opacity-0 transition-opacity': isHiddenFirst,
  });

  if (audio) {
    return (
      <a className={classNameLink} href={`/${slug}`} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${slug}`}>
      <a className={classNameLink}>{children}</a>
    </Link>
  );
}

function FeaturedPostsItemContent({
  alternativeTitle,
  text,
  title,
}: Props): JSX.Element {
  return (
    <Box className="p-5 w-full text-center text-gray">
      <Paragraph>
        <strong>{alternativeTitle || title}</strong>
      </Paragraph>
      {text && <Paragraph>{text}</Paragraph>}
    </Box>
  );
}
