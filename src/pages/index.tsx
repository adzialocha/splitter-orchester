import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import type { GetStaticProps } from 'next';
import type { Post, SanityImage as SanityImageType } from 'sanity-schema';

import { getNavigations } from '~/helpers';
import type { Navigations } from '~/types';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import ParallaxContainer from '~/components/ParallaxContainer';
import SanityImage from '~/components/SanityImage';
import { getFeaturedPosts, getMainImage } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

type Props = {
  featuredPosts?: Post[];
  mainImage?: SanityImageType;
  navigations: Navigations;
};

// Maximum size of main image which will be placed in the center top
const MAIN_IMAGE_SIZE = 1200;

// Probability of making a "gap" between featured posts on the homepage
const HOLE_PROBABILIY = 0.1;

// Load `PostPreview` component without SSR as it contains randomized values
// which might differ otherwise between server-client side
const DynamicPostPreview = dynamic(() => import('~/components/PostPreview'), {
  ssr: false,
});

const DynamicParallaxElement = dynamic(
  () => import('~/components/ParallaxElement'),
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
            className="m-auto"
            height={MAIN_IMAGE_SIZE}
            source={mainImage}
            width={MAIN_IMAGE_SIZE}
          />
        )}
      </Container>
      <HomePagePosts featuredPosts={featuredPosts} />
    </Layout>
  );
}

function HomePagePosts({ featuredPosts }): JSX.Element {
  // Define order of elements. Since `featuredPosts` is already sorted by
  // publication date we can assume that the first element is the latest.
  const order = useMemo(() => {
    // This is a trick to make "holes" when counting up the position of the
    // post preview. We achieve this by simply counting up twice per
    // element if we want a gap inbetween.
    let counter = 0;
    return featuredPosts.map(() => {
      counter += Math.random() > HOLE_PROBABILIY ? 1 : 2;
      return counter;
    });
  }, [featuredPosts]);

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <ParallaxContainer>
      {featuredPosts.map((post, index) => {
        return (
          <DynamicParallaxElement key={post.slug} order={order[index]}>
            <DynamicPostPreview
              alternativeTitle={post.feature.title}
              audio={post.feature.audio}
              image={post.feature.image}
              slug={post.slug}
              text={post.feature.text}
              title={post.title}
            />
          </DynamicParallaxElement>
        );
      })}
    </ParallaxContainer>
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
