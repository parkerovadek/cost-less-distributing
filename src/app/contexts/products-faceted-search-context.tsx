'use client';
import { createContext, useState, Dispatch, SetStateAction, useContext, useMemo } from 'react';
import { useUpdateEffect } from 'react-use';
import { PRODUCT_COLLECTIONS, PRODUCT_SEARCH_FACETS } from '@/constants';
import { getProductSearchResults } from '@/services/search';
import { ProductResults, ProductSearchQuery } from '@/types/ProductSearch';

type ProductsFacetedSearchContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  productsCollection: string;
  setProductsCollection: Dispatch<SetStateAction<string>>;
  productResults: ProductResults;
  setProductResults?: Dispatch<SetStateAction<ProductResults>>;
  facetFilters?: string[];
  setFacetFilters?: Dispatch<SetStateAction<string[]>>;
};

export const ProductsFacetedSearchContext = createContext<ProductsFacetedSearchContextType>({
  query: '',
  setQuery: () => {},
  productsCollection: '',
  setProductsCollection: () => {},
  productResults: { facets: {}, products: [] },
  setProductResults: () => {},
  facetFilters: [],
  setFacetFilters: () => {},
});

export const ProductsFacetedSearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [productsCollection, setProductsCollection] = useState('');
  const [productResults, setProductResults] = useState<ProductResults>();
  const [facetFilters, setFacetFilters] = useState<string[]>([]);

  const getFacets = (): string[] => {
    switch (productsCollection.toLowerCase()) {
      case PRODUCT_COLLECTIONS.Pet:
        return PRODUCT_SEARCH_FACETS.Pet;
      case PRODUCT_COLLECTIONS.PhoneAccessories:
        return PRODUCT_SEARCH_FACETS.PhoneAccessories;
      case PRODUCT_COLLECTIONS.Popcorn:
        return PRODUCT_SEARCH_FACETS.Popcorn;
      default:
        return [];
    }
  };

  const getProductResults = async (productSearchQuery: ProductSearchQuery) => {
    return getProductSearchResults(productSearchQuery)
      .then((results) => {
        setProductResults(results);
      })
      .catch(() => console.error('Error fetching products'));
  };

  useUpdateEffect(() => {
    getProductResults({ query, facets: getFacets(), facetFilters });
  }, [productsCollection, query, facetFilters]);

  const contextValue = useMemo(
    () => ({
      query,
      setQuery,
      productsCollection,
      setProductsCollection,
      productResults,
      setProductResults,
      facetFilters,
      setFacetFilters,
    }),
    [query, productsCollection, productResults, facetFilters],
  );

  return (
    <ProductsFacetedSearchContext.Provider value={contextValue}>
      {children}
    </ProductsFacetedSearchContext.Provider>
  );
};

export const useProductsFacetedSearchContext = () => useContext(ProductsFacetedSearchContext);
