import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post } from 'sanity-schema';

import { getNavigation } from '~/helpers';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';

type Props = {
  mainNavigation?: Post[];
};

export default function HomePage({ mainNavigation }: Props): JSX.Element {
  return (
    <Layout mainNavigation={mainNavigation}>
      <Container>
        <Paragraph>Hello, Splitter!</Paragraph>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mainNavigation = await getNavigation('mainNavigation');

  return {
    props: {
      mainNavigation,
    },
  };
};
