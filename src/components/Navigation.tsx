import Link from 'next/link';
import React from 'react';

import type { Post } from 'sanity-schema';

type Props = {
  items: Post[];
};

export default function Navigation({ items }: Props): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        {items.map((item) => {
          return (
            <li key={item._id}>
              <Link href={`/posts/${item.slug.current}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
