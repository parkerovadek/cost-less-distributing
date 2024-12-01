'use client';
import { useEffect, useState } from 'react';
import { getVendors } from '@/services/shopify';
import { SelectInput, useField, useWatchForm } from '@payloadcms/ui';
import { OptionObject } from 'payload';
import { useCompanyStore } from './store';

type CompanySelectorProps = {
  path: string;
  label: string;
};

const CompanySelectorComponent = ({ path, label }: CompanySelectorProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState([]);

  const { getField } = useWatchForm();
  const { value: collections } = getField('productSelector.collections');
  const { value: dynamicValues } = getField('productSelector.dynamicValues');

  const { setCompany } = useCompanyStore();

  useEffect(() => {
    if (typeof dynamicValues === 'string') {
      const [collection, selectedCompany, selectedProduct] = dynamicValues.split(';');
      setValue(selectedCompany);
    }

    getVendors()
      .then((response) =>
        setOptions(response.map((company) => ({ label: company, value: company }))),
      )
      .catch(() => console.error('Error fetching companies'));
  }, []);

  return (
    collections === 'Pet' && (
      <SelectInput
        label={label}
        name={label}
        path={path}
        options={options}
        value={value}
        onChange={(e: OptionObject) => {
          setValue(e?.value);
          setCompany(e?.value);
        }}
      />
    )
  );
};

export default CompanySelectorComponent;
