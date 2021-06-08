import { groq } from 'next-sanity';

const postFields = groq`
  _id,
  title,
  image,
  body,
  publishedAt,
  "slug": slug.current
`;

export const getAllPosts = groq`
  *[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`;

export const getAllPostSlugs = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;