import React from 'react';

type Props = {
  src: string;
  className?: string;
};

export default function Image({ src, className }: Props): JSX.Element {
  return <img className={className} src={src} />;
}
