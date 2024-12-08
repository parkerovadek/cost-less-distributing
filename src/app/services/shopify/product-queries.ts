'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

type Product = {
  id: string;
  title: string;
  handle: string;
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
            handle
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
    handle: node.handle,
    vendor: node.vendor,
    collections: node.collections,
    variants: node.variants,
    metafield: node.metafield,
  }));
};

export const getProductByHandle = async (handle: string): Promise<Product> => {
  const request = await shopifyClient.fetch(
    `#graphql
      query ProductByHandle {
        product(handle: "${handle}") {
          id
          title
          handle
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
    `,
  );

  const {
    data: { product },
  } = await request.json();

  return product;
};

export const getVendors = async (): Promise<string[]> => {
  const request = await shopifyClient.fetch(
    `#graphql
    query Vendors {
      products(first: 10) {
        edges {
          node {
            vendor
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

  return [...new Set(edges.map(({ node }) => node.vendor))];
};
