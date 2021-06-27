import { Transition } from '@tailwindui/react';
import React, { useState } from 'react';

import type { NavigationItem } from '~/types';

import Box from '~/components/Box';
import Container from '~/components/Container';
import Header from '~/components/Header';
import Logo from '~/components/Logo';
import Navigation from '~/components/Navigation';

type Props = {
  items?: NavigationItem[];
};

export default function HeaderPage({ items }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((value) => !value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeaderPageOverlay isOpen={isOpen} onClick={handleClose} />
      <Header className="absolute md:fixed z-30 pt-5 sm:pt-10 w-full pointer-events-none">
        <Container>
          <Logo onClick={handleClose} />
          <Box
            className="flex justify-center sm:pt-5"
            style={{ paddingRight: '50%' }}
          >
            <Navigation
              isOpen={isOpen}
              items={items}
              onClose={handleClose}
              onToggle={handleToggle}
            />
          </Box>
        </Container>
      </Header>
    </>
  );
}

function HeaderPageOverlay({ isOpen, onClick }): JSX.Element {
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
