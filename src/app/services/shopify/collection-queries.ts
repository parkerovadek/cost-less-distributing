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

export const getCollectionsByHandle = async (handle: string) => {
  const request = await shopifyClient.fetch(
    `#graphql
      query CollectionsByHandle {
        collectionByHandle(handle: "${handle}") {
          title
        }
      }
    `,
  );

  const {
    data: { collectionByHandle },
  } = await request.json();

  return collectionByHandle;
};

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
