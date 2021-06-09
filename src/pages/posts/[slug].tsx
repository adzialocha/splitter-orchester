import BlockContent from '@sanity/block-content-to-react';
import React from 'react';

import type { Post as PostType } from '../../types';
import type { GetStaticPaths, GetStaticProps } from 'next';

import Article from '../../components/Article';
import Container from '../../components/Container';
import Date from '../../components/Date';
import Header from '../../components/Header';
import Heading from '../../components/Heading';
import Image from '../../components/Image';
import Layout from '../../components/Layout';
import Paragraph from '../../components/Paragraph';
import Section from '../../components/Section';
import { getAllPostSlugs, getPostBySlug } from '../../lib/queries';
import { getClient, sanityClient } from '../../lib/sanity.server';

type Props = {
  post?: PostType;
};

export default function Post({ post }: Props): JSX.Element {
  return (
    <Layout>
      <Container>
        <Article>
          <Header>
            <Heading>{post.title}</Heading>
            <Paragraph>
              <Date dateString={post.publishedAt} />
            </Paragraph>
          </Header>
          <Section>{post.image && <Image source={post.image} />}</Section>
          <Section>
            <BlockContent blocks={post.body} />
          </Section>
        </Article>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getClient().fetch(getPostBySlug, {
    slug: params.slug,
  });

  return {
    props: {
      post,
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
