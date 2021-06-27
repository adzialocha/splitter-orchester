import React from 'react';

import Box from '~/components/Box';

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props): JSX.Element {
  return <Box className="container px-5 mx-auto">{children}</Box>;
}
