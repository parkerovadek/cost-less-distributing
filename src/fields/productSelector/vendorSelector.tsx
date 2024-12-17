'use client';
import { useEffect, useRef, useState } from 'react';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { getVendors } from '@/services/shopify';
import { useCollectionStore, useVendorStore } from './store';

type VendorSelectorProps = {
  path: string;
  label: string;
};

const VendorSelectorComponent = ({ path, label }: VendorSelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<OptionObject[]>([]);

  const { collection } = useCollectionStore();
  const { setVendor } = useVendorStore();

  useEffect(() => {
    getVendors()
      .then((response) => setOptions(response.map((vendor) => ({ label: vendor, value: vendor }))))
      .catch(() => console.error('Error fetching companies'));

    if (value) {
      setValue(value);
      setVendor(value);
    }
  }, [collection, value, setValue, setVendor]);

  return (
    collection === 'Pet' && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        options={options}
        value={value || ''}
        onChange={(e: OptionObject) => {
          const selectedVendor = e?.value || '';
          setValue(selectedVendor);
          setVendor(selectedVendor);
        }}
      />
    )
  );
};

export default VendorSelectorComponent;
