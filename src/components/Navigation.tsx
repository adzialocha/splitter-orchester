import Link from 'next/link';
import React from 'react';

import type { NavigationItem } from '~/types';

type Props = {
  items: NavigationItem[];
};

export default function Navigation({ items }: Props): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => {
          return (
            <li key={item.slug}>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
