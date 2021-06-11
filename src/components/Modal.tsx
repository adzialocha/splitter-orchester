import { Transition } from '@tailwindui/react';
import React from 'react';

import Box from '~/components/Box';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
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
      className="fixed z-10 inset-0 overflow-y-auto"
      role="dialog"
    >
      <Box className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {children}
      </Box>
    </Box>
  );
}

function ModalOverlay({ onClose }): JSX.Element {
  return (
    <Box
      aria-hidden="true"
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      onClick={onClose}
    />
  );
}

// This element is to trick the browser into centering the modal contents.
function ModalCenterHack(): JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="hidden sm:inline-block sm:align-middle sm:h-screen"
    >
      &#8203;
    </span>
  );
}

function ModalContent({ children }): JSX.Element {
  return (
    <Box className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      {children}
    </Box>
  );
}
