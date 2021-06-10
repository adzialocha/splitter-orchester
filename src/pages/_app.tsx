import Head from 'next/head';
import React from 'react';

import type { AppProps } from 'next/app';

import AudioPlayer from '~/components/AudioPlayer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { AudioPlayerProvider } from '~/store/audio';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Splitter Orchester</title>
      </Head>
      <Header />
      <AudioPlayerProvider>
        <Component {...pageProps} />
        <AudioPlayer />
      </AudioPlayerProvider>
      <Footer />
    </>
  );
}

export default App;
