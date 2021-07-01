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
      // Scroll to top after route changed. This uses the `#wrapper` container,
      // which is used as the main element for scrolling inside the `Layout`
      // component
      document.getElementById('wrapper').scroll({
        top: 0,
      });

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
        <meta content="Splitter Orchester" name="title" />
        <meta
          content="Splitter Orchester combines the collective power of 24 of Berlin’s most consistently creative, self motivated and conceptually optimistic musicians"
          name="description"
        />
        <meta
          content="Orchestra, Music, Splitter, Experimental, Improvisation, Echtzeitmusik, Ensemble, Sound, Noise, Berlin"
          name="keywords"
        />
        <meta
          content="Splitter Orchester combines the collective power of 24 of Berlin’s most consistently creative, self motivated and conceptually optimistic musicians"
          property="og:description"
        />
        <meta content="Splitter Orchester" property="og:title" />
        <meta content="https://splitter.berlin" property="og:url" />
        <meta
          content="https://splitter.berlin/splitter-orchester.jpg"
          property="og:image"
        />
        <meta content="image/jpeg" property="og:image:type" />
        <meta content="2048" property="og:image:width" />
        <meta content="1365" property="og:image:height" />
        <meta content="index, follow" name="robots" />
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta content="English" name="language" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="alternate icon" />
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
