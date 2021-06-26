import React from 'react';

import { AudioPlayerProvider } from '~/state';
import type { Navigations } from '~/types';

import AudioPlayer from '~/components/AudioPlayer';
import Container from '~/components/Container';
import Footer from '~/components/Footer';
import HeaderPage from '~/components/HeaderPage';
import NavigationFooter from '~/components/NavigationFooter';

type Props = {
  children: React.ReactNode;
  navigations?: Navigations;
};

export default function Layout({ children, navigations }: Props): JSX.Element {
  return (
    <>
      <HeaderPage items={navigations.main} />
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
