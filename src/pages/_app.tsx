import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/nprogress.css';

import locale from '~/locale';
import { AudioPlayerProvider } from '~/state';

import AudioPlayer from '~/components/AudioPlayer';

const BASE_PATH = 'https://splitter.berlin';

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
        <meta content={locale.title} name="title" />
        <meta content={locale.description} name="description" />
        <meta content={locale.keywords} name="keywords" />
        <meta content={locale.description} property="og:description" />
        <meta content={locale.title} property="og:title" />
        <meta content={BASE_PATH} property="og:url" />
        <meta
          content={`${BASE_PATH}/splitter-orchester.jpg`}
          property="og:image"
        />
        <meta content="image/jpeg" property="og:image:type" />
        <meta content="3189" property="og:image:width" />
        <meta content="2126" property="og:image:height" />
        <meta content="index, follow" name="robots" />
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta content="English" name="language" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="alternate icon" />
        <title>{locale.title}</title>
      </Head>
      <AudioPlayerProvider>
        <Component {...pageProps} />
        <AudioPlayer />
      </AudioPlayerProvider>
    </>
  );
}

export default App;
