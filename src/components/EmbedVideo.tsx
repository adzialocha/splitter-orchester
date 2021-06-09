import React from 'react';

type Props = {
  url: string;
};

export default function EmbedVideo({ url }: Props): JSX.Element {
  // @TODO: Build a nice video preview here
  return <p>{url}</p>;
}
