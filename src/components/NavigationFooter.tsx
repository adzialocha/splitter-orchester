import Link from 'next/link';
import React from 'react';

import type { NavigationItem } from '~/types';

import List from '~/components/List';
import ListItem from '~/components/ListItem';

type Props = {
  items: NavigationItem[];
};

export default function Navigation({ items }: Props): JSX.Element {
  return (
    <List>
      {items.map((item) => {
        return (
          <ListItem key={item.slug}>
            <Link href={`/${item.slug}`}>{item.title}</Link>
          </ListItem>
        );
      })}
    </List>
  );
}
