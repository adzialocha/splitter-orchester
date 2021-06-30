import React from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post as PostSchema } from 'sanity-schema';

import type { Navigations } from '~/types';

import Article from '~/components/Article';
import Container from '~/components/Container';
import Heading from '~/components/Heading';
import Layout from '~/components/Layout';
import SanityBlockContent from '~/components/SanityBlockContent';
import { getNavigations } from '~/lib/navigation';
import { getAllPostSlugs, getPostBySlug } from '~/lib/queries';
import { getClient, sanityClient } from '~/lib/sanity.server';

type Props = {
  post?: PostSchema;
  navigations: Navigations;
};

export default function Post({ post, navigations }: Props): JSX.Element {
  return (
    <Layout navigations={navigations}>
      <Container className="max-w-3xl">
        <Article className="mx-auto mt-60 md:mt-72 md:ml-56">
          <Heading className="mb-5 text-center md:text-left">
            {post.title}
          </Heading>
          {post.body && <SanityBlockContent blocks={post.body} />}
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
