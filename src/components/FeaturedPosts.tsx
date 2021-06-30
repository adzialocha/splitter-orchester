import MobileDetect from 'mobile-detect';
import React, { useMemo } from 'react';

import type { Audio, Post } from 'sanity-schema';

import { useTrackedAudioPlayer } from '~/state';

import FeaturedPostsItem from '~/components/FeaturedPostsItem';
import ParallaxContainer from '~/components/ParallaxContainer';
import ParallaxElement from '~/components/ParallaxElement';

type Props = {
  posts: Post[];
};

// Probability of making a "gap" between featured posts on the homepage
const HOLE_PROBABILIY = 0.1;

export default function FeaturedPosts({ posts }: Props): JSX.Element {
  const [, dispatch] = useTrackedAudioPlayer();

  // Define order of elements. Since `posts` is already sorted by
  // publication date we can assume that the first element is the latest.
  const order = useMemo(() => {
    // This is a trick to make "holes" when counting up the position of the
    // post preview. We achieve this by simply counting up twice per
    // element if we want a gap inbetween.
    let counter = -1;
    return posts.map(() => {
      counter += Math.random() > HOLE_PROBABILIY ? 1 : 2;
      return counter;
    });
  }, [posts]);

  // iOS 13 breaks support for `transformZ` and therefore also support for our
  // CSS-only parallax effect. See:
  // https://css-tricks.com/ios-13-broke-the-classic-pure-css-parallax-technique/
  const isParallaxDisabled = useMemo(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.is('iPhone') || md.is('iPad') || md.is('iOS') || md.is('Webkit');
  }, []);

  const handleClick = ({ url, caption }: Audio, slug) => {
    dispatch({ type: 'play', url, caption, slug });
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <ParallaxContainer isDisabled={isParallaxDisabled}>
      {posts.map((post, index) => {
        return (
          <ParallaxElement
            isDisabled={isParallaxDisabled}
            key={post.slug}
            order={order[index]}
          >
            <FeaturedPostsItem
              alternativeTitle={post.feature.title}
              audio={post.feature.audio}
              image={post.feature.image}
              slug={post.slug}
              text={post.feature.text}
              title={post.title}
              onClick={handleClick}
            />
          </ParallaxElement>
        );
      })}
    </ParallaxContainer>
  );
}
