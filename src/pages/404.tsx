import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';

export default function NotFoundError(): JSX.Element {
  return (
    <>
      <Layout>
        <Container>
          <p>Page not found ...</p>
        </Container>
      </Layout>
    </>
  );
}
