import React from 'react';

import Image from '~/components/Image';
import { useVideo } from '~/hooks/video';

type Props = {
  url: string;
  caption?: string;
};

export default function EmbedVideo({ url, caption }: Props): JSX.Element {
  const { thumbnailUrl, isLoading, isError, title } = useVideo(url);

  // @TODO: Make this look nice
  return isLoading ? (
    <p>...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <Image src={thumbnailUrl} />
      <p>{caption || title}</p>
    </>
  );
}
