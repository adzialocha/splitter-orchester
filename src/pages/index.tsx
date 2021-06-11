import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post } from 'sanity-schema';

import { getNavigations } from '~/helpers';
import type { Navigations } from '~/types';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import { getFeaturedPosts } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

type Props = {
  navigations: Navigations;
  posts?: Post[];
};

export default function HomePage({ navigations, posts }: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container>
        <Paragraph>Hello, Splitter!</Paragraph>
        <ul>
          {posts.map((post) => {
            return <li key={post.slug}>{post.title}</li>;
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const navigations = await getNavigations();
  const posts = await getClient().fetch(getFeaturedPosts);

  return {
    props: {
      navigations,
      posts,
    },
  };
};
