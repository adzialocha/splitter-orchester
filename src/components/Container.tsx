import clsx from 'clsx';
import React from 'react';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ className, children }: Props): JSX.Element {
  return (
    <Box className={clsx('container px-5 mx-auto', className)}>{children}</Box>
  );
}
