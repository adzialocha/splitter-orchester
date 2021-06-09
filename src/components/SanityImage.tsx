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
};

const DEFAULT_SIZE = 500;

export default function SanityImage({
  source,
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  fit = 'crop',
}: Props): JSX.Element {
  return (
    <Image
      src={urlForImage(source).height(height).width(width).fit(fit).url()}
    />
  );
}
