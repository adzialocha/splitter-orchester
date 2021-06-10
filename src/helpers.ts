import type { Post } from 'sanity-schema';

import { getNavigations } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

export async function getNavigation(key = 'mainNavigation'): Promise<Post[]> {
  const navigation = await getClient().fetch(getNavigations);
  return navigation && navigation.length > 0 && key in navigation[0]
    ? navigation[0][key]
    : [];
}
