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

const navigationFields = groq`
  _id,
  "slug": slug.current,
  title,
`;

export const getNavigations = groq`
  *[_type == "siteConfig" && _id == "defaultSiteConfig"][0] {
    mainNavigation[]->{
      ${navigationFields}
    },
    footerNavigation[]->{
      ${navigationFields}
    },
  }
`;

export const getMainImage = groq`
  *[_type == "siteConfig" && _id == "defaultSiteConfig"][0] {
    mainImage {
      ...,
      asset->{
        ...,
        "_key": _id
      }
    }
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
