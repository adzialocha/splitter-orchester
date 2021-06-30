import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html className="font-sans font-medium text-white" lang="en">
        <Head />
        <body className="overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
