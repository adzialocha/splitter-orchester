import clsx from 'clsx';
import React from 'react';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
  isDisabled?: boolean;
};

export default function ParallaxContainer({
  children,
  isDisabled = false,
}: Props): JSX.Element {
  return (
    <Box className="md:fixed md:inset-0">
      <Box
        className={clsx(
          'md:overflow-x-hidden md:overflow-y-scroll md:relative md:h-full',
          {
            'md:parallax-container': !isDisabled,
          },
        )}
      >
        {children}
      </Box>
    </Box>
  );
}
