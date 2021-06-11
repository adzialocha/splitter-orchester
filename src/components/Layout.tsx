import React from 'react';

import type { Post } from 'sanity-schema';

import { AudioPlayerProvider } from '~/state';

import AudioPlayer from '~/components/AudioPlayer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';

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
