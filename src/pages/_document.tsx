import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html className="text-white font-sans font-medium" lang="en">
        <Head />
        <body className="bg-gray">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
