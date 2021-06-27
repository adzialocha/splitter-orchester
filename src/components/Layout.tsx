import clsx from 'clsx';
import React from 'react';

import { AudioPlayerProvider } from '~/state';
import type { Navigations } from '~/types';

import AudioPlayer from '~/components/AudioPlayer';
import Box from '~/components/Box';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import HeaderPage from '~/components/HeaderPage';
import NavigationFooter from '~/components/NavigationFooter';

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
    <Box className="flex flex-col h-screen">
      <HeaderPage items={navigations.main} />
      <AudioPlayerProvider>
        <main className="flex-grow pt-2 sm:pt-5">{children}</main>
        <AudioPlayer />
      </AudioPlayerProvider>
      <Footer
        className={clsx('py-5 sm:py-10', {
          'md:hidden': !isFooterVisible,
        })}
      >
        <Container>
          <NavigationFooter items={navigations.footer} />
        </Container>
      </Footer>
    </Box>
  );
}
