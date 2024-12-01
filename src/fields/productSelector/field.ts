import { Field } from 'payload';

export const ProductSelector: Field = {
  name: 'productSelector',
  label: 'Product Selector',
  type: 'group',
  fields: [
    {
      name: 'collections',
      label: 'Product Collection',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Pet',
          value: 'Pet',
        },
        {
          label: 'Home',
          value: 'Home',
        },
        {
          label: 'Fashion',
          value: 'Fashion',
        },
      ],
    },
    {
      name: 'companies',
      label: 'Company',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: 'src/fields/productSelector/companySelector.tsx',
            clientProps: {
              label: 'Company',
            },
          },
        },
      },
    },
    {
      name: 'products',
      label: 'Product',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: 'src/fields/productSelector/productSelector.tsx',
            clientProps: {
              label: 'Product',
            },
          },
        },
      },
    },
    {
      name: 'dynamicValues',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: 'src/fields/productSelector/productSelectorValues.tsx',
          },
        },
      },
      // hidden: true,
    },
  ],
};
