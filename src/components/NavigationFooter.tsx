import Link from 'next/link';
import React from 'react';

import type { NavigationItem } from '~/types';

type Props = {
  items: NavigationItem[];
};

export default function Navigation({ items }: Props): JSX.Element {
  return (
    <nav>
      <ul className="text-center">
        {items.map((item) => {
          return (
            <li className="inline" key={item.slug}>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
