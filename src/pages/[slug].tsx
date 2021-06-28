import React from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post as PostSchema } from 'sanity-schema';

import type { Navigations } from '~/types';

import Article from '~/components/Article';
import Container from '~/components/Container';
import Date from '~/components/Date';
import Header from '~/components/Header';
import Heading from '~/components/Heading';
import Layout from '~/components/Layout';
import Paragraph from '~/components/Paragraph';
import SanityBlockContent from '~/components/SanityBlockContent';
import SanityImage from '~/components/SanityImage';
import Section from '~/components/Section';
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
      <Container>
        <Article>
          <Header>
            <Heading>{post.title}</Heading>
            <Paragraph>
              <Date dateString={post.publishedAt} />
            </Paragraph>
          </Header>
          <Section>
            {post.feature && post.feature.image && (
              <SanityImage source={post.feature.image} />
            )}
          </Section>
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
