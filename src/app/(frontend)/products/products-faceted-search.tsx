'use client';
import { useEffect, useMemo, useState } from 'react';
import { capitalize } from '@/utilities/capitalize';
import { useProductsFacetedSearchContext } from '@/contexts/products-faceted-search-context';

export const ProductsSearch = ({ collectionName }) => {
  const { query, setQuery, setProductsCollection, productResults, setFacetFilters } =
    useProductsFacetedSearchContext();
  const { products, facets } = useMemo(
    () => productResults ?? { facets: {}, products: [] },
    [productResults],
  );

  useEffect(() => {
    setProductsCollection(collectionName);
    setFacetFilters((prevFilters) => {
      const newFilters = prevFilters.filter((filter) => !filter.startsWith('collection'));
      if (collectionName) {
        newFilters.push(`meta.custom.collection:${collectionName}`);
      }
      return newFilters;
    });
  }, []);

  return (
    <>
      <h1>PRODUCTS</h1>
      <code>{JSON.stringify(products)}</code>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(query);
        }}
      >
        <input className="text-black" type="text" placeholder="Search for products" />
      </form>
      {
        // TODO: Update these options to allow for multiple to be set at once and pass them to the search query
        Object.keys(facets).map((facetKey) => {
          const facetList = facetKey?.split('.');
          const facet = capitalize(facetList[facetList?.length - 1]);
          const facetValues = Object.keys(facets[facetKey]);

          return (
            <div key={facetKey}>
              <label>{facet}</label>

              <select
                className="text-black"
                onChange={(e) => {
                  setFacetFilters((prevFilters) => {
                    const newFilters = prevFilters.filter((filter) => !filter.startsWith(facetKey));
                    if (e.target.value) {
                      newFilters.push(e.target.value);
                    }
                    return newFilters;
                  });
                }}
              >
                <option value="" key={facet}>
                  {facet}
                </option>
                {facetValues.map((facetValue) => {
                  return (
                    <option value={`${facetKey}:${facetValue}`} key={facetValue}>
                      {facetValue}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })
      }
    </>
  );
};
