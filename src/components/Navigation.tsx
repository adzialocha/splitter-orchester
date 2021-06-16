import Link from 'next/link';
import React, { useState } from 'react';

import type { NavigationItem } from '~/types';

type Props = {
  items: NavigationItem[];
};

export default function NavigationHeader({ items }: Props): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((value) => !value);
  };

  const handleClick = () => {
    setIsExpanded(false);
  };

  return (
    <nav className="relative">
      <NavigationHeaderTriangle onClick={handleToggle} />
      {isExpanded && (
        <NavigationHeaderMenu items={items} onClick={handleClick} />
      )}
    </nav>
  );
}

function NavigationHeaderTriangle({ onClick }): JSX.Element {
  return (
    <button className="p-5 focus:outline-none" onClick={onClick}>
      <span className="absolute transform rotate-60 -left-2 bottom-11">
        Navigation
      </span>
      <div className="clip-arrow-down w-28 h-24 bg-white" />
    </button>
  );
}

function NavigationHeaderMenu({ items, onClick }): JSX.Element {
  return (
    <ul className="absolute -left-16 -bottom-56 clip-arrow-up bg-white text-gray text-center py-28 w-96 h-80">
      <NavigationHeaderItem href="/" onClick={onClick}>
        Home
      </NavigationHeaderItem>
      {items.map((item) => {
        return (
          <NavigationHeaderItem
            href={`/${item.slug}`}
            key={item.slug}
            onClick={onClick}
          >
            {item.title}
          </NavigationHeaderItem>
        );
      })}
    </ul>
  );
}

function NavigationHeaderItem({ children, href, onClick }): JSX.Element {
  return (
    <li className="max-w-xs m-auto" onClick={onClick}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
