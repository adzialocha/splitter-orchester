import audio from './audio';
import blockContent from './blockContent';
import post from './post';
import siteConfig from './siteConfig';
import video from './video';

// Export all schema types for Sanity v3
export const schemaTypes = [
  // The following are document types which will appear in
  // the studio.
  audio,
  post,
  siteConfig,
  video,
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  blockContent,
];
