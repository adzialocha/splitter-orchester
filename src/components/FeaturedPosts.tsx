import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

import type { Post } from 'sanity-schema';

import { useTrackedAudioPlayer } from '~/state';

import ParallaxContainer from '~/components/ParallaxContainer';

type Props = {
  posts: Post[];
};

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

export default function FeaturedPosts({ posts }: Props): JSX.Element {
  const [, dispatch] = useTrackedAudioPlayer();

  // Define order of elements. Since `posts` is already sorted by
  // publication date we can assume that the first element is the latest.
  const order = useMemo(() => {
    // This is a trick to make "holes" when counting up the position of the
    // post preview. We achieve this by simply counting up twice per
    // element if we want a gap inbetween.
    let counter = 0;
    return posts.map(() => {
      counter += Math.random() > HOLE_PROBABILIY ? 1 : 2;
      return counter;
    });
  }, [posts]);

  const handleClick = ({ url }) => {
    dispatch({ type: 'play', url });
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <ParallaxContainer items={posts.length}>
      {posts.map((post, index) => {
        return (
          <DynamicParallaxElement key={post.slug} order={order[index]}>
            <DynamicPostPreview
              alternativeTitle={post.feature.title}
              audio={post.feature.audio}
              image={post.feature.image}
              slug={post.slug}
              text={post.feature.text}
              title={post.title}
              onClick={handleClick}
            />
          </DynamicParallaxElement>
        );
      })}
    </ParallaxContainer>
  );
}
