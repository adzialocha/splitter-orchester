import React from 'react';

import { AudioPlayerProvider } from '~/state';
import type { Navigations } from '~/types';

import AudioPlayer from '~/components/AudioPlayer';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Logo from '~/components/Logo';
import Navigation from '~/components/Navigation';

type Props = {
  children: React.ReactNode;
  navigations?: Navigations;
};

export default function Layout({ children, navigations }: Props): JSX.Element {
  return (
    <>
      <Header className="py-5 sm:py-10">
        <Container>
          <Logo />
          <Navigation items={navigations.main} />
        </Container>
      </Header>
      <AudioPlayerProvider>
        <main>{children}</main>
        <AudioPlayer />
      </AudioPlayerProvider>
      <Footer>
        <Navigation items={navigations.footer} />
      </Footer>
    </>
  );
}
