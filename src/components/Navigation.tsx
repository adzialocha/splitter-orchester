import { Transition } from '@tailwindui/react';
import Link from 'next/link';
import React from 'react';

import type { NavigationItem as NavigationItemType } from '~/types';

type Props = {
  items: NavigationItemType[];
  isOpen: boolean;
  onClose: React.MouseEventHandler;
  onToggle: React.MouseEventHandler;
};

export default function Navigation({
  items,
  isOpen,
  onClose,
  onToggle,
}: Props): JSX.Element {
  return (
    <nav className="relative text-center">
      <NavigationTriangle onClick={onToggle} />
      <NavigationMenu isOpen={isOpen} items={items} onClick={onClose} />
    </nav>
  );
}

function NavigationTriangle({ onClick }): JSX.Element {
  return (
    <button
      className="p-5 filter drop-shadow-xl focus:outline-none pointer-events-auto"
      onClick={onClick}
    >
      <span className="absolute bottom-11 -left-2 transform rotate-60">
        Navigation
      </span>
      <div className="w-28 h-24 bg-white clip-arrow-down" />
    </button>
  );
}

function NavigationMenu({ items, isOpen, onClick }): JSX.Element {
  return (
    <Transition
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={isOpen}
    >
      <NavigationItems items={items} onClick={onClick} />
    </Transition>
  );
}

function NavigationItems({ items, onClick }): JSX.Element {
  return (
    <ul className="sm:absolute py-24 w-96 h-80 leading-snug text-center text-gray bg-white drop-shadow-xl pointer-events-none clip-arrow-up sm:navigation-position">
      <NavigationItem href="/" index={0} onClick={onClick}>
        Home
      </NavigationItem>
      {items.map((item, index) => {
        return (
          <NavigationItem
            href={`/${item.slug}`}
            index={index + 1}
            key={item.slug}
            onClick={onClick}
          >
            {item.title}
          </NavigationItem>
        );
      })}
    </ul>
  );
}

function NavigationItem({ children, href, onClick, index }): JSX.Element {
  // Since the navigation is a weird triangle we make sure the text of each
  // navigation item is not wider than the border of the shape
  const minMaxWidth = 115;
  const extraWidthPerStep = 28;
  const maxWidth = minMaxWidth + index * extraWidthPerStep;

  return (
    <li
      className="overflow-hidden m-auto overflow-ellipsis whitespace-nowrap pointer-events-auto select-none"
      style={{ maxWidth }}
    >
      <Link href={href}>
        <a onClick={onClick}>{children}</a>
      </Link>
    </li>
  );
}
