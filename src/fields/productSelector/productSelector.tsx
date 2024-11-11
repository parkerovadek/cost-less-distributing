'use client';
import { SelectInput, useField, useWatchForm } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { useEffect, useState } from 'react';

type ProductSelectorProps = {
  path: string;
  label: string;
};

const ProductSelectorComponent = ({ path, label }: ProductSelectorProps) => {
  const [options, setOptions] = useState([]);
  const { getFields, getField } = useWatchForm();
  const { value, setValue } = useField<string>({ path });

  const fields = getFields();
  const { value: collections } = getField('productSelector.collections');
  const { value: companies } = getField('productSelector.companies');

  useEffect(() => {
    console.log('fields', fields);
    console.log('collections', collections);
    console.log('companies', companies);
  }, [fields, collections, companies]);

  return (
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
  );
};

export default ProductSelectorComponent;
