import strapi from './strapi';

export default async (query: string) =>
  await strapi.request('post', '/graphql', { data: { query: query } });
