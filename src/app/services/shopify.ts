'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

export const getCompanies = async () => {
  const request = await shopifyClient.fetch(
    `#graphql
    query Collections {
      collections(first: 250) {
        nodes {
          id
          title
          metafield(namespace: "custom", key: "is_company") {
            namespace
            key
            value
          }
        }
      }
    }
  `,
  );

  const {
    data: { collections },
  } = await request.json();
  const companies = collections.nodes.filter((node) => node.metafield?.value === 'true');

  return companies.map((company) => ({
    id: company.id,
    title: company.title,
  }));
};
