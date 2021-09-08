import React from 'react';

import type {
  FitMode,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types';

import Image from '~/components/Image';
import { urlForImage } from '~/lib/sanity';

type Props = {
  fit?: FitMode;
  height?: number;
  source: SanityImageSource;
  width?: number;
  className?: string;
};

const DEFAULT_SIZE = 1200;

export default function SanityImage({
  source,
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  fit = 'max',
  className,
}: Props): JSX.Element {
  return (
    <Image
      className={className}
      src={urlForImage(source).maxHeight(height).maxWidth(width).fit(fit).url()}
    />
  );
}
