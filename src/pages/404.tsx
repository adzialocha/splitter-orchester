import React from 'react';

import type { GetStaticProps } from 'next';

import { getNavigations } from '~/helpers';
import type { Navigations } from '~/types';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';

type Props = {
  navigations: Navigations;
};

export default function NotFoundError({ navigations }: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container>
        <Paragraph>404</Paragraph>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      navigations: await getNavigations(),
    },
  };
};
