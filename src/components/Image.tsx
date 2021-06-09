import React from 'react';

type Props = {
  src: string;
};

export default function Image({ src }: Props): JSX.Element {
  return <img src={src} />;
}
