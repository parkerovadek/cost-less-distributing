'use client';
import { SelectInput, useField, useWatchForm } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { useEffect, useMemo, useState } from 'react';
import { useCompanyStore } from './store';
import {
  ProductsFacetedSearchProvider,
  useProductsFacetedSearchContext,
} from '@/contexts/products-faceted-search-context';

type ProductSelectorProps = {
  path: string;
  label: string;
};

const ProductSelector = ({ path, label }: ProductSelectorProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState([]);

  const { getField } = useWatchForm();
  const { value: collections } = getField('productSelector.collections');
  const { value: dynamicValues } = getField('productSelector.dynamicValues');

  const { company } = useCompanyStore();
  const { setFacetFilters, setProductsCollection, productResults } =
    useProductsFacetedSearchContext();
  const { facets } = useMemo(() => productResults ?? { facets: [] }, [productResults]);

  useEffect(() => {
    setProductsCollection(collections as string);

    if (!company) return;

    if (typeof dynamicValues === 'string') {
      const [collection, selectedCompany, selectedProduct] = dynamicValues.split(';');
      setValue(selectedProduct);
    }

    setFacetFilters((prevFilters) => {
      const newFilters = prevFilters.filter((filter) => !filter.startsWith('vendor'));
      newFilters.push(`vendor:${company}`);
      return newFilters;
    });
  }, [company]);

  useEffect(() => {
    setOptions(
      Object.keys(facets)
        .filter((facetKey) => facetKey.includes('product'))
        .map((facetKey) => {
          const facetValues = Object.keys(facets[facetKey]);

          return {
            options: facetValues.map((value) => ({
              label: value,
              value: `${facetKey}:${value}`,
            })),
          };
        }),
    );
  }, [facets]);

  return (
    collections === 'Pet' &&
    company && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        value={value}
        onChange={(e: OptionObject) => setValue(e?.value)}
        options={options}
      />
    )
  );
};

const ProductSelectorComponent = ({ path, label }: ProductSelectorProps) => {
  return (
    <ProductsFacetedSearchProvider>
      <ProductSelector path={path} label={label} />
    </ProductsFacetedSearchProvider>
  );
};
export default ProductSelectorComponent;
