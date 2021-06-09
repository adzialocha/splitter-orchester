import type { ClientConfig } from 'next-sanity';

const config: ClientConfig = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables if
   * you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: 'production',
  projectId: 'a8gjiary',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
};

export default config;
