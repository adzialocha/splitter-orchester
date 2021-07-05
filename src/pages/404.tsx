import React from 'react';

import type { GetStaticProps } from 'next';

import type { Navigations } from '~/types';

import Article from '~/components/Article';
import Container from '~/components/Container';
import Heading from '~/components/Heading';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import { getNavigations } from '~/lib/navigation';

type Props = {
  navigations: Navigations;
};

export default function NotFoundError({ navigations }: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container>
        <Article className="pt-60 mx-auto md:mt-20 max-w-md md:max-w-3xl">
          <Heading className="md:block-content-even">404</Heading>
          <Paragraph className="md:block-content-even">
            We could not find the requested page ..
          </Paragraph>
        </Article>
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
