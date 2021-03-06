import { Transition } from '@tailwindui/react';
import React, { useState } from 'react';

import type { NavigationItem } from '~/types';

import Box from '~/components/Box';
import Navigation from '~/components/Navigation';
import Title from '~/components/Title';

type Props = {
  navigation: NavigationItem[];
};

export default function Header({ navigation }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((value) => !value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeaderOverlay isOpen={isOpen} onClick={handleClose} />
      <header className="absolute z-30 pt-5 md:pt-10 w-full pointer-events-none">
        <Title onClick={handleClose} />
        <Box className="flex justify-center md:pt-5 nav-left md:nav-right">
          <Navigation
            isOpen={isOpen}
            items={navigation}
            onClose={handleClose}
            onToggle={handleToggle}
          />
        </Box>
      </header>
    </>
  );
}

function HeaderOverlay({ isOpen, onClick }): JSX.Element {
  return (
    <Transition
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={isOpen}
    >
      <Box
        aria-hidden="true"
        className="fixed inset-0 z-20 bg-gray bg-opacity-75 transition-opacity"
        onClick={onClick}
      />
    </Transition>
  );
}
