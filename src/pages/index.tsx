import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Layout>
        <Container>
          <p>Hello, Splitter!</p>
        </Container>
      </Layout>
    </>
  );
}
