import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post, SanityImage as SanityImageType } from 'sanity-schema';

import { getNavigations } from '~/helpers';
import type { Navigations } from '~/types';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import SanityImage from '~/components/SanityImage';
import { getFeaturedPosts, getMainImage } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

type Props = {
  navigations: Navigations;
  posts?: Post[];
  mainImage?: SanityImageType;
};

export default function HomePage({
  navigations,
  posts,
  mainImage,
}: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container>
        {mainImage && <SanityImage className="m-auto" source={mainImage} />}
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
  const { mainImage } = await getClient().fetch(getMainImage);

  return {
    props: {
      navigations,
      posts,
      mainImage,
    },
  };
};
