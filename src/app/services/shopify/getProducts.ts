'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

type Product = {
  id: string;
  title: string;
  vendor: string;
  collections: {
    nodes: {
      id: string;
      title: string;
    }[];
  };
  variants: {
    nodes: {
      id: string;
    }[];
  };
  metafield: {
    namespace: string;
    key: string;
    value: string;
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const request = await shopifyClient.fetch(
    `#graphql
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            vendor
            collections (first: 10) {
              nodes {
                id
                title
              }
            }
            variants (first: 10) {
              nodes{
                id
              }
            }
            metafield(namespace: "custom", key: "company") {
              namespace
              key
              value
            }
          }
        }
      }
    }
  `,
  );

  const {
    data: {
      products: { edges },
    },
  } = await request.json();

  return edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    vendor: node.vendor,
    collections: node.collections,
    variants: node.variants,
    metafield: node.metafield,
  }));
};
