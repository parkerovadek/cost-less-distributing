'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

export const getCollections = async () => {
  const request = await shopifyClient.fetch(
    `#graphql
    query Collections {
      collections(first: 100) {
        edges {
          node {
            title
            handle
          }
        }
      }
    }
  `,
  );

  const {
    data: {
      collections: { edges },
    },
  } = await request.json();

  return edges;
};
