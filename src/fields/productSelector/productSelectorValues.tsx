'use client';
import { useEffect, useRef } from 'react';
import { useField, useWatchForm } from '@payloadcms/ui';
import { useCollectionStore, useCompanyStore, useProductStore } from './store';

const ProductSelectorValues = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });

  const { collection, setCollection } = useCollectionStore();
  const { company, setCompany } = useCompanyStore();
  const { product, setProduct } = useProductStore();

  const { dispatchFields } = useWatchForm();
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!hasHydrated.current && value) {
      try {
        const parsedData = JSON.parse(value);

        if (parsedData.collection) {
          setCollection(parsedData.collection);
          dispatchFields({
            type: 'UPDATE',
            path: 'productSelector.collections',
            value: parsedData.collection,
          });
        }

        if (parsedData.company) {
          setCompany(parsedData.company);
          dispatchFields({
            type: 'UPDATE',
            path: 'productSelector.companies',
            value: parsedData.company,
          });
        }

        if (parsedData.product) {
          setProduct(parsedData.product);
          dispatchFields({
            type: 'UPDATE',
            path: 'productSelector.products',
            value: parsedData.product,
          });
        }

        hasHydrated.current = true;
      } catch (err) {
        console.error('Error parsing hidden field JSON:', err);
      }
    }
  }, [value, setCollection, setCompany, setProduct, dispatchFields]);

  useEffect(() => {
    const currentCollection = collection || '';
    const currentCompany = company || '';
    const currentProduct = product || '';

    const data = {
      collection: currentCollection,
      company: currentCompany,
      product: currentProduct,
    };

    setValue(JSON.stringify(data));
  }, [collection, company, product, setValue]);

  return <input type="hidden" value={value || ''} />;
};

export default ProductSelectorValues;
