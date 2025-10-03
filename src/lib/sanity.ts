import createImageUrlBuilder from '@sanity/image-url';

import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import sanityConfig from '~/lib/config';

export const imageBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId!,
  dataset: sanityConfig.dataset!,
});

export const urlForImage = (source: SanityImageSource): ImageUrlBuilder =>
  imageBuilder.image(source).auto('format').fit('max');
