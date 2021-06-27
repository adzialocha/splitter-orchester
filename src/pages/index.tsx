import dynamic from 'next/dynamic';
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
  featuredPosts?: Post[];
  mainImage?: SanityImageType;
  navigations: Navigations;
};

const MAIN_IMAGE_SIZE = 1200;

// Load `PostPreview` component without SSR as it contains randomized values
// which might differ otherwise between server-client side
const DynamicPostPreview = dynamic(() => import('~/components/PostPreview'), {
  ssr: false,
});

export default function HomePage({
  featuredPosts,
  mainImage,
  navigations,
}: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container>
        {mainImage && (
          <SanityImage
            className="m-auto"
            height={MAIN_IMAGE_SIZE}
            source={mainImage}
            width={MAIN_IMAGE_SIZE}
          />
        )}
      </Container>
      {featuredPosts.map((post) => {
        return (
          <DynamicPostPreview
            alternativeTitle={post.feature.title}
            audio={post.feature.audio}
            image={post.feature.image}
            key={post.slug}
            slug={post.slug}
            text={post.feature.text}
            title={post.title}
          />
        );
      })}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = await getClient().fetch(getFeaturedPosts);
  const { mainImage } = await getClient().fetch(getMainImage);
  const navigations = await getNavigations();

  return {
    props: {
      featuredPosts,
      mainImage,
      navigations,
    },
  };
};
