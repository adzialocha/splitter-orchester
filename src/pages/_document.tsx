import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <title>Splitter Orchester</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
