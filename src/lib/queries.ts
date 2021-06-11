import { groq } from 'next-sanity';

const postFields = groq`
  _id,
  title,
  feature,
  body[]{
    ...,
    asset->{
      ...,
      "_key": _id
    }
  },
  publishedAt,
  "slug": slug.current,
`;

export const getNavigations = groq`
  *[_type == "siteConfig"] {
    mainNavigation[]->{
      _id,
      slug,
      title,
    },
    footerNavigation[]->{
      _id,
      slug,
      title,
    },
  }
`;

export const getAllPosts = groq`
  *[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const getFeaturedPosts = groq`
  *[_type == "post" && feature.isFeatured == true] | order(publishedAt desc, _updatedAt desc) {
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
