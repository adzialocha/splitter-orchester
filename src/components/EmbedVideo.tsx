import React from 'react';

type Props = {
  url: string;
  caption?: string;
};

export default function EmbedVideo({ url, caption }: Props): JSX.Element {
  // @TODO: Build a nice video preview here
  return (
    <p>
      {url} {caption}
    </p>
  );
}
