import { Transition } from '@tailwindui/react';
import React from 'react';

import Box from '~/components/Box';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: React.MouseEventHandler;
};

export default function Modal({
  isOpen,
  children,
  onClose,
}: Props): JSX.Element {
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
      <ModalContainer>
        <ModalOverlay onClose={onClose} />
        <ModalCenterHack />
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Transition>
  );
}

function ModalContainer({ children }): JSX.Element {
  return (
    <Box
      aria-labelledby="modal-title"
      aria-modal="true"
      className="overflow-y-auto fixed inset-0 z-50"
      role="dialog"
    >
      <Box className="flex sm:block justify-center items-center sm:items-end sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center">
        {children}
      </Box>
    </Box>
  );
}

function ModalOverlay({ onClose }): JSX.Element {
  return (
    <Box
      aria-hidden="true"
      className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity"
      onClick={onClose}
    />
  );
}

// This element is to trick the browser into centering the modal contents.
function ModalCenterHack(): JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="hidden sm:inline-block sm:h-screen sm:align-middle"
    >
      &#8203;
    </span>
  );
}

function ModalContent({ children }): JSX.Element {
  return (
    <Box className="inline-block overflow-hidden sm:my-8 w-full sm:max-w-4xl text-left align-bottom sm:align-middle bg-white shadow-xl transition-all transform">
      {children}
    </Box>
  );
}
