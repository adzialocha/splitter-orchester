import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post } from 'sanity-schema';

import { getNavigation } from '~/helpers';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';

type Props = {
  mainNavigation?: Post[];
  footerNavigation?: Post[];
};

export default function HomePage({
  mainNavigation,
  footerNavigation,
}: Props): JSX.Element {
  return (
    <Layout mainNavigation={mainNavigation} footerNavigation={footerNavigation}>
      <Container>
        <Paragraph>Hello, Splitter!</Paragraph>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mainNavigation = await getNavigation('mainNavigation');
  const footerNavigation = await getNavigation('footerNavigation');

  return {
    props: {
      mainNavigation,
      footerNavigation,
    },
  };
};
