import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { AudioPlayerProvider } from '~/state';

import AudioPlayer from '~/components/AudioPlayer';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html className="font-sans font-medium text-white" lang="en">
        <Head />
        <body className="overflow-x-hidden bg-gray">
          <AudioPlayerProvider>
            <Main />
            <AudioPlayer />
          </AudioPlayerProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}
