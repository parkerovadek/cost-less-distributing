'use client';
import { useEffect, useState } from 'react';
import { getCompanies } from '@/services/shopify';
import { SelectInput, useField } from '@payloadcms/ui';
import { OptionObject } from 'payload';

type CompanySelectorProps = {
  path: string;
  label: string;
};

const CompanySelectorComponent = ({ path, label }: CompanySelectorProps) => {
  const { value, setValue } = useField<string>({ path });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => console.error('Error fetching companies'));
  }, []);

  return (
    <SelectInput
      label={label}
      name={label}
      path={path}
      options={companies.map((company) => ({ label: company, value: company }))}
      value={value}
      onChange={(e) => setValue((e as OptionObject)?.value)}
    />
  );
};

export default CompanySelectorComponent;
