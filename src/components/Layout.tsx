import React from 'react';

import { AudioPlayerProvider } from '~/state';
import type { Navigations } from '~/types';

import AudioPlayer from '~/components/AudioPlayer';
import Box from '~/components/Box';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Logo from '~/components/Logo';
import Navigation from '~/components/Navigation';
import NavigationFooter from '~/components/NavigationFooter';

type Props = {
  children: React.ReactNode;
  navigations?: Navigations;
};

export default function Layout({ children, navigations }: Props): JSX.Element {
  return (
    <>
      <Header className="py-5 sm:py-10 fixed w-full">
        <Container>
          <Logo />
          <Box className="p-5 flex justify-center">
            <Navigation items={navigations.main} />
          </Box>
        </Container>
      </Header>
      <AudioPlayerProvider>
        <main className="pt-60">{children}</main>
        <AudioPlayer />
      </AudioPlayerProvider>
      <Footer className="py-5 sm:py-10">
        <Container>
          <NavigationFooter items={navigations.footer} />
        </Container>
      </Footer>
    </>
  );
}
