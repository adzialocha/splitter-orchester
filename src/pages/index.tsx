import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post } from 'sanity-schema';

import { getNavigation } from '~/helpers';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import { getFeaturedPosts } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

type Props = {
  mainNavigation?: Post[];
  footerNavigation?: Post[];
  posts?: Post[];
};

export default function HomePage({
  mainNavigation,
  footerNavigation,
  posts,
}: Props): JSX.Element {
  return (
    <Layout mainNavigation={mainNavigation} footerNavigation={footerNavigation}>
      <Container>
        <Paragraph>Hello, Splitter!</Paragraph>
        <ul>
          {posts.map((post) => {
            return <li key={post._id}>{post.title}</li>;
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mainNavigation = await getNavigation('mainNavigation');
  const footerNavigation = await getNavigation('footerNavigation');
  const posts = await getClient().fetch(getFeaturedPosts);

  return {
    props: {
      mainNavigation,
      footerNavigation,
      posts,
    },
  };
};
