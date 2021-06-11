import React from 'react';

import type { Post } from 'sanity-schema';

import AudioPlayer from '~/components/AudioPlayer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';
import { AudioPlayerProvider } from '~/store/audio';

type Props = {
  children: React.ReactNode;
  mainNavigation?: Post[];
  footerNavigation?: Post[];
};

export default function Layout({
  children,
  mainNavigation,
  footerNavigation,
}: Props): JSX.Element {
  return (
    <>
      <Header>
        <Navigation items={mainNavigation} />
      </Header>
      <AudioPlayerProvider>
        <main>{children}</main>
        <AudioPlayer />
      </AudioPlayerProvider>
      <Footer>
        <Navigation items={footerNavigation} />
      </Footer>
    </>
  );
}
