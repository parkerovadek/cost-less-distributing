'use client';
import { useEffect } from 'react';
import { useField, useWatchForm } from '@payloadcms/ui';

const ProductSelectorValues = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const { getField } = useWatchForm();
  const { value: collection } = getField('productSelector.collections');
  const { value: company } = getField('productSelector.companies');
  const { value: product } = getField('productSelector.products');

  useEffect(() => {
    setValue(`${collection};${company};${product}`);
  }, [collection, company, product]);

  console.log('value', value);
};

export default ProductSelectorValues;
