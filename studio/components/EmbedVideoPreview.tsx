import React from 'react';
import { MediaPreview } from 'sanity';

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

  return <MediaPreview media={renderMedia} title={value.title} />;
}
