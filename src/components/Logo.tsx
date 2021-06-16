import Link from 'next/link';
import React from 'react';

import Heading from '~/components/Heading';

export default function Logo(): JSX.Element {
  return (
    <Heading className="text-2xl sm:text-4xl text-center">
      <Link href="/">Splitter Orchester</Link>
    </Heading>
  );
}
