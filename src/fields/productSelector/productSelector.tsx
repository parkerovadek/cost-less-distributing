'use client';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { useEffect, useState } from 'react';
import { useCollectionStore, useCompanyStore } from './store';
import { useProductStore } from './store';
import {
  ProductsFacetedSearchProvider,
  useProductsFacetedSearchContext,
} from '@/contexts/products-faceted-search-context';

type ProductSelectorProps = {
  path: string;
  label: string;
};

const ProductSelector = ({ path, label }: ProductSelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<OptionObject[]>([]);

  const { company } = useCompanyStore();
  const { collection } = useCollectionStore();
  const { product, setProduct } = useProductStore();

  const { setFacetFilters, setProductsCollection, productResults } =
    useProductsFacetedSearchContext();

  useEffect(() => {
    if (collection) {
      setProductsCollection(collection);
    }
  }, [collection, setProductsCollection]);

  useEffect(() => {
    if (company) {
      setFacetFilters((prevFilters) => {
        const newFilters = prevFilters.filter((filter) => !filter.startsWith('vendor'));
        newFilters.push(`vendor:${company}`);
        return newFilters;
      });
    }
  }, [company, setFacetFilters]);

  useEffect(() => {
    const facets = productResults?.facets || {};
    const productFacets = Object.keys(facets).filter((key) => key.includes('product'));
    const newOptions = productFacets.flatMap((facetKey) =>
      Object.keys(facets[facetKey]).map((facetValue) => ({
        label: facetValue,
        value: facetValue,
      })),
    );
    setOptions(newOptions);

    if (product && !value) {
      setValue(product);
    }
  }, [productResults, product, value, setValue]);

  return (
    company &&
    collection && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        options={options}
        value={value || ''}
        onChange={(e: OptionObject) => {
          const selectedProduct = e?.value || '';
          setValue(selectedProduct);
          setProduct(selectedProduct);
        }}
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
