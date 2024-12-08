'use client';
import { useEffect, useState } from 'react';
import { getVendors } from '@/services/shopify';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';

type CompanySelectorProps = {
  path: string;
  label: string;
};

const CompanySelectorComponent = ({ path, label }: CompanySelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getVendors()
      .then((response) =>
        setOptions(response.map((company) => ({ label: company, value: company }))),
      )
      .catch(() => console.error('Error fetching companies'));
  }, []);

  console.log('value', value);

  return (
    <SelectInput
      label={label}
      name={label}
      path={path}
      options={options}
      value={value}
      onChange={(e: OptionObject) => setValue(e?.value)}
    />
  );
};

export default CompanySelectorComponent;
