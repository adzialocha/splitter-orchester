import clsx from 'clsx';
import React from 'react';

import type { Navigations } from '~/types';

import Box from '~/components/Box';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

type Props = {
  children: React.ReactNode;
  navigations?: Navigations;
  isFooterVisible?: boolean;
};

export default function Layout({
  children,
  navigations,
  isFooterVisible = true,
}: Props): JSX.Element {
  return (
    <Box
      className={clsx('overflow-x-scroll absolute inset-0 bg-gray', {
        'md:overflow-x-hidden': !isFooterVisible,
      })}
      id="wrapper"
    >
      <Box className="flex flex-col h-screen">
        <Header navigation={navigations.main} />
        <main className="flex-grow pt-2 sm:pt-5">{children}</main>
        <Footer isVisible={isFooterVisible} navigation={navigations.footer} />
      </Box>
    </Box>
  );
}
