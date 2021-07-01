import Link from 'next/link';
import React from 'react';

import Heading from '~/components/Heading';

type Props = {
  onClick: React.MouseEventHandler;
};

export default function Title({ onClick }: Props): JSX.Element {
  return (
    <Heading className="text-2xl md:text-4xl font-medium text-center select-none">
      <Link href="/">
        <a className="pointer-events-auto" onClick={onClick}>
          Splitter Orchester
        </a>
      </Link>
    </Heading>
  );
}
