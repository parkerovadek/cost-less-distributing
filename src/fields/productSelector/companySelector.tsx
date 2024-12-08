'use client';
import { useEffect, useRef, useState } from 'react';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { getVendors } from '@/services/shopify';
import { useCollectionStore, useCompanyStore } from './store';

type CompanySelectorProps = {
  path: string;
  label: string;
};

const CompanySelectorComponent = ({ path, label }: CompanySelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<OptionObject[]>([]);

  const { collection } = useCollectionStore();
  const { setCompany } = useCompanyStore();

  useEffect(() => {
    getVendors()
      .then((response) =>
        setOptions(response.map((company) => ({ label: company, value: company }))),
      )
      .catch(() => console.error('Error fetching companies'));

    if (value) {
      setValue(value);
      setCompany(value);
    }
  }, [collection, value, setValue, setCompany]);

  return (
    collection === 'Pet' && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        options={options}
        value={value || ''}
        onChange={(e: OptionObject) => {
          const selectedCompany = e?.value || '';
          setValue(selectedCompany);
          setCompany(selectedCompany);
        }}
      />
    )
  );
};

export default CompanySelectorComponent;
