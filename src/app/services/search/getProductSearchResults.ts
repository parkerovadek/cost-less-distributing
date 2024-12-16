'use server';
import { Facet, ProductSearchQuery, ProductResults, Result } from '@/types/ProductSearch';
import { searchClient } from '@/utilities/searchClient';

export const getProductSearchResults = async ({
  query = '',
  facets = [],
  facetFilters = [],
}: ProductSearchQuery): Promise<ProductResults> => {
  const indexName = process.env.ALGOLIA_PRODUCTS_INDEX_NAME;

  const response = await searchClient.searchSingleIndex({
    indexName,
    searchParams: {
      query,
      facets,
      facetFilters,
    },
  });

  const facetsObject = response.facets || {};

  return {
    facets: Object.keys(facetsObject).reduce(
      (acc, facetKey) => {
        acc[facetKey] = facetsObject[facetKey];
        return acc;
      },
      {} as { [key: string]: Facet },
    ),
    products: response.hits.map((product: Result) => ({
      objectID: product.objectID,
      vendor: product.vendor,
      title: product.title,
    })),
  };
};
