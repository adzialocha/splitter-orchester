import React from 'react';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';

export default function HomePage(): JSX.Element {
  return (
    <Layout>
      <Container>
        <Paragraph>Hello, Splitter!</Paragraph>
      </Container>
    </Layout>
  );
}
