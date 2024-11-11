'use client';
import { SelectInput, useField, useWatchForm } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { useEffect, useState } from 'react';
import { useCompanyStore } from './store';
import { getCollectionsByHandle } from '@/services/shopify';

type ProductSelectorProps = {
  path: string;
  label: string;
};

const ProductSelectorComponent = ({ path, label }: ProductSelectorProps) => {
  const [options, setOptions] = useState([]);
  // const { getField, getData } = useWatchForm();
  // const field = getData();
  const { getField } = useWatchForm();
  const { value: collections } = getField('productSelector.collections');
  const { value, setValue } = useField<string>({ path });
  const { company } = useCompanyStore();

  useEffect(() => {
    if (!company) return;

    getCollectionsByHandle(company)
      .then((response) =>
        setOptions(response.map((product) => ({ label: product.title, value: product.id }))),
      )
      .catch(() => console.error('Error fetching products'));
  }, [company]);

  // const { value: collections } = getField('productSelector.collections');
  // const { value: companies } = getField('productSelector.companies');

  return (
    collections === 'Pet' &&
    company && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        value={value}
        onChange={(e: OptionObject) => setValue(e?.value)}
        // options={products.map((product) => ({
        //   label: product.title,
        //   value: product.id,
        // }))}
        options={options}
      />
    )
  );
};
export default ProductSelectorComponent;
