import React from 'react';

import Footer from './Footer';
import Header from './Header';

type Props = {
  children: JSX.Element;
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
