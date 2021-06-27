import React from 'react';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
};

export default function ParallaxContainer({ children }: Props): JSX.Element {
  return (
    <Box className="md:fixed md:inset-0">
      <Box className="md:overflow-x-hidden md:overflow-y-scroll md:relative md:h-full md:parallax-container">
        {children}
      </Box>
    </Box>
  );
}
