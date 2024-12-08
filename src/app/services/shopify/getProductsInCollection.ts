'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

export const getProductsInCollection = async (collectionId: string) => {
  const request = await shopifyClient.fetch(
    `#graphql
    query ProductsInCollection {
      collection(id: "${collectionId}") {
        products(first: 10) {
          edges {
            node {
              id
              title
              vendor
            }
          }
        }
      }
    }
  `,
  );

  const {
    data: {
      collection: {
        products: { edges },
      },
    },
  } = await request.json();

  return edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    vendor: node.vendor,
  }));
};
