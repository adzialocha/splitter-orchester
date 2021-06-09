import React from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout';
import Paragraph from '../components/Paragraph';

export default function NotFoundError(): JSX.Element {
  return (
    <Layout>
      <Container>
        <Paragraph>404</Paragraph>
      </Container>
    </Layout>
  );
}
