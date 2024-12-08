'use client';
import { useEffect, useState } from 'react';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { getCollections } from '@/services/shopify';
import { useCollectionStore } from './store';

type CollectionSelectorProps = {
  path: string;
  label: string;
};

const CollectionSelector = ({ path, label }: CollectionSelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<OptionObject[]>([]);

  const { setCollection } = useCollectionStore();

  useEffect(() => {
    getCollections()
      .then((response) => {
        const newOptions = response.map(({ node: { title } }) => ({
          label: title,
          value: title,
        }));
        setOptions(newOptions);

        if (value) {
          setValue(value);
          setCollection(value);
        }
      })
      .catch(() => console.error('Error fetching collections'));
  }, [value, setValue, setCollection]);

  return (
    <SelectInput
      label={label}
      name={label}
      path={path}
      options={options}
      value={value || ''}
      onChange={(e: OptionObject) => {
        const selectedCollection = e?.value || '';
        setValue(selectedCollection);
        setCollection(selectedCollection);
      }}
    />
  );
};

export default CollectionSelector;
