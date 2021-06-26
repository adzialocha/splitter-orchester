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
      <span className="absolute bottom-11 -left-2 transform rotate-60">
        Navigation
      </span>
      <div className="w-28 h-24 bg-white clip-arrow-down" />
    </button>
  );
}

function NavigationHeaderMenu({ items, onClick }): JSX.Element {
  return (
    <ul className="absolute -bottom-56 -left-16 py-28 w-96 h-80 text-center text-gray bg-white clip-arrow-up">
      <NavigationHeaderItem href="/" index={0} onClick={onClick}>
        Home
      </NavigationHeaderItem>
      {items.map((item, index) => {
        return (
          <NavigationHeaderItem
            href={`/${item.slug}`}
            index={index + 1}
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

function NavigationHeaderItem({ children, href, onClick, index }): JSX.Element {
  // Since the navigation is a weird triangle we make sure the text of each
  // navigation item is not wider than the border of the shape
  const minMaxWidth = 130;
  const extraWidthPerStep = 28;
  const maxWidth = minMaxWidth + index * extraWidthPerStep;

  return (
    <li
      className="overflow-hidden m-auto overflow-ellipsis"
      style={{ maxWidth }}
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
}
