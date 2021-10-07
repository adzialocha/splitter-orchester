import React from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post as PostSchema } from 'sanity-schema';

import type { Navigations } from '~/types';

import Article from '~/components/Article';
import Container from '~/components/Container';
import HeadingWithSymbol from '~/components/HeadingWithSymbol';
import Layout from '~/components/Layout';
import SanityBlockContent from '~/components/SanityBlockContent';
import { extendBlocksData } from '~/lib/blocks';
import { getNavigations } from '~/lib/navigation';
import { getAllPostSlugs, getPostBySlug } from '~/lib/queries';
import { getClient, sanityClient } from '~/lib/sanity.server';

type Props = {
  post?: PostSchema;
  navigations: Navigations;
};

export default function Post({ post, navigations }: Props): JSX.Element {
  const extendedBlocks = post.body ? extendBlocksData(post.body) : [];
  const isSingle =
    post.body &&
    extendedBlocks.length > 0 &&
    extendedBlocks[0].totalSections === 1;

  return (
    <Layout navigations={navigations}>
      <Container className="max-w-3xl">
        <Article className="mx-auto md:mt-20 max-w-md md:max-w-3xl">
          <HeadingWithSymbol
            className="md:block-content-even"
            isFirst
            isSingle={isSingle}
          >
            {post.title}
          </HeadingWithSymbol>
          {post.body && <SanityBlockContent blocks={extendedBlocks} />}
        </Article>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const navigations = await getNavigations();
  const post = await getClient().fetch(getPostBySlug, {
    slug: params.slug,
  });

  return {
    props: {
      post,
      navigations,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient.fetch(getAllPostSlugs);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
