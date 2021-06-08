import Head from 'next/head';
import React from 'react';

import type { AppProps } from 'next/app';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Splitter Orchester</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
