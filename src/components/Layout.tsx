import React from 'react';

import type { Post } from 'sanity-schema';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';

type Props = {
  children: React.ReactNode;
  mainNavigation?: Post[];
};

export default function Layout({
  children,
  mainNavigation,
}: Props): JSX.Element {
  return (
    <>
      <Header>
        <Navigation items={mainNavigation} />
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
