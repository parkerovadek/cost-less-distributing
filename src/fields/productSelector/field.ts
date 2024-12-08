import { Field } from 'payload';

export const ProductSelector: Field = {
  name: 'productSelector',
  label: 'Product Selector',
  type: 'group',
  fields: [
    {
      name: 'collections',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: 'src/fields/productSelector/collectionSelector.tsx',
            clientProps: {
              label: 'Product Collection',
            },
          },
        },
      },
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
    },
  ],
};
