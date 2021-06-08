import BlockContent from '@sanity/block-content-to-react';
import React from 'react';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Post as PostType } from '../../types';

import Container from '../../components/Container';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { getPostBySlug, getAllPostSlugs } from '../../lib/queries';
import { sanityClient, getClient } from '../../lib/sanity.server';
import { urlForImage } from '../../lib/sanity';

type Props = {
  post?: PostType;
};

export default function Post({ post }: Props): JSX.Element {
  return (
    <Layout>
      <Container>
        <article>
          <header>
            <h1 className="font-bold text-lg">{post.title}</h1>
            <p className="italic">
              <Date dateString={post.publishedAt} />
            </p>
          </header>
          <section>
            {post.image && (
              <img
                src={urlForImage(post.image)
                  .height(500)
                  .width(500)
                  .fit('crop')
                  .url()}
              />
            )}
            <BlockContent blocks={post.body} />
          </section>
        </article>
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
