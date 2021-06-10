import Head from 'next/head';
import React from 'react';

import type { AppProps } from 'next/app';

import AudioPlayer from '~/components/AudioPlayer';
import { AudioPlayerProvider } from '~/store/audio';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Splitter Orchester</title>
      </Head>
      <AudioPlayerProvider>
        <Component {...pageProps} />
        <AudioPlayer />
      </AudioPlayerProvider>
    </>
  );
}

export default App;
