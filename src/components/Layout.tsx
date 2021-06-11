import React from 'react';

import { AudioPlayerProvider } from '~/state';
import type { Navigations } from '~/types';

import AudioPlayer from '~/components/AudioPlayer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';

type Props = {
  children: React.ReactNode;
  navigations?: Navigations;
};

export default function Layout({ children, navigations }: Props): JSX.Element {
  return (
    <>
      <Header>
        <Navigation items={navigations.main} />
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
