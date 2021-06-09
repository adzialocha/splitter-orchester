import React from 'react';

import Footer from '~/components/Footer';
import Header from '~/components/Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
