import Link from 'next/link';
import React from 'react';

import Heading from '~/components/Heading';

type Props = {
  onClick: React.MouseEventHandler;
};

export default function Logo({ onClick }: Props): JSX.Element {
  return (
    <Heading className="text-2xl sm:text-4xl text-center filter drop-shadow-lg select-none">
      <Link href="/">
        <a className="pointer-events-auto" onClick={onClick}>
          Splitter Orchester
        </a>
      </Link>
    </Heading>
  );
}
