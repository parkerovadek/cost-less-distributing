'use client';
import { useEffect, useRef } from 'react';
import { useField, useWatchForm } from '@payloadcms/ui';
import { useCollectionStore, useVendorStore, useProductStore } from './store';

const ProductSelectorValues = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });

  const { collection, setCollection } = useCollectionStore();
  const { vendor, setVendor } = useVendorStore();
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

        if (parsedData.vendor) {
          setVendor(parsedData.vendor);
          dispatchFields({
            type: 'UPDATE',
            path: 'productSelector.companies',
            value: parsedData.vendor,
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
  }, [value, setCollection, setVendor, setProduct, dispatchFields]);

  useEffect(() => {
    const currentCollection = collection || '';
    const currentVendor = vendor || '';
    const currentProduct = product || '';

    const data = {
      collection: currentCollection,
      vendor: currentVendor,
      product: currentProduct,
    };

    setValue(JSON.stringify(data));
  }, [collection, vendor, product, setValue]);

  return <input type="hidden" value={value || ''} />;
};

export default ProductSelectorValues;
