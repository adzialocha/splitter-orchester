import dynamic from 'next/dynamic';
import React from 'react';

import type { GetStaticProps } from 'next';
import type { Post, SanityImage as SanityImageType } from 'sanity-schema';

import type { Navigations } from '~/types';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import SanityImage from '~/components/SanityImage';
import { getNavigations } from '~/lib/navigation';
import { getFeaturedPosts, getMainImage } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

type Props = {
  featuredPosts?: Post[];
  mainImage?: SanityImageType;
  navigations: Navigations;
};

// Maximum size of main image which will be placed in the center top
const MAIN_IMAGE_SIZE = 1200;

// Load `FeaturedPosts` component without SSR as it contains randomized values
// which might differ otherwise between server-client side
const DynamicFeaturedPosts = dynamic(
  () => import('~/components/FeaturedPosts'),
  {
    ssr: false,
  },
);

export default function HomePage({
  featuredPosts,
  mainImage,
  navigations,
}: Props): JSX.Element {
  return (
    <Layout isFooterVisible={false} navigations={navigations}>
      <Container>
        {mainImage && (
          <SanityImage
            className="m-auto w-full max-w-xl"
            height={MAIN_IMAGE_SIZE}
            source={mainImage}
            width={MAIN_IMAGE_SIZE}
          />
        )}
      </Container>
      <DynamicFeaturedPosts posts={featuredPosts} />
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
