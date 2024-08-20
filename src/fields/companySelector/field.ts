import { TextField } from 'payload';

export const CompanySelector: TextField = {
  name: 'companies',
  label: 'Company',
  type: 'text',
  admin: {
    components: {
      Field: {
        path: 'src/fields/companySelector/component.tsx',
        clientProps: {
          path: 'src/fields/companySelector/component.tsx',
          label: 'Company',
        },
      },
    },
  },
};
