import BlockImagePreview from 'part:@sanity/components/previews/block-image';
import React from 'react';

// Reuse hook from app codebase :-P
import { useVideo } from '../../src/hooks';

type Props = {
  value: {
    title: string;
    url: string;
  };
};

export default function EmbedVideoPreview({ value }: Props): JSX.Element {
  const { thumbnailUrl, isLoading, isError } = useVideo(value.url);

  const renderMedia = () => {
    return isLoading || isError ? null : (
      <img alt={value.url} src={thumbnailUrl} />
    );
  };

  return <BlockImagePreview media={renderMedia} title={value.title} />;
}
