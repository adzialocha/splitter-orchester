import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import audio from './audio';
import blockContent from './blockContent';
import post from './post';
import video from './video';

// Then we give our schema to the builder and provide the
// result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type to the
  // ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear in
    // the studio.
    audio,
    post,
    video,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
