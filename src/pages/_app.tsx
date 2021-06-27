import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/nprogress.css';

import { AudioPlayerProvider } from '~/state';

import AudioPlayer from '~/components/AudioPlayer';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  // Use `nprogress` to indicate loading state of routes
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
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
