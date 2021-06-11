import type { SiteConfig } from 'sanity-schema';

import type { Navigations } from '~/types';

import { getNavigations as query } from '~/lib/queries';
import { getClient } from '~/lib/sanity.server';

function extractNavigation(navigations: SiteConfig, key: string) {
  return navigations && key in navigations ? navigations[key] : [];
}

export async function getNavigations(): Promise<Navigations> {
  const config: SiteConfig = await getClient().fetch(query);

  return {
    main: extractNavigation(config, 'mainNavigation'),
    footer: extractNavigation(config, 'footerNavigation'),
  };
}
