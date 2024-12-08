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
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.collections === 'Pet',
        components: {
          Field: {
            path: 'src/fields/productSelector/companySelector.tsx',
            clientProps: {
              label: 'Company',
              path: 'src/fields/productSelector/companySelector.tsx',
            },
          },
        },
      },
    },
    {
      name: 'products',
      label: 'Product',
      type: 'text',
      admin: {
        condition: (data, siblingData) =>
          siblingData.collections !== 'Pet' || siblingData.companies !== null,
        components: {
          Field: {
            path: 'src/fields/productSelector/productSelector.tsx',
            clientProps: {
              label: 'Product',
              path: 'src/fields/productSelector/productSelector.tsx',
            },
          },
        },
      },
    },
  ],
};
// export const ProductSelector: Field = {
//   name: 'productSelector',
//   label: 'Product Selector',
//   type: 'group',
//   fields: [
//     {
//       name: 'collections',
//       label: 'Product Collection',
//       type: 'text',
//     },
//     {
//       name: 'companies',
//       label: 'Company',
//       type: 'text',
//       admin: {
//         components: {
//           Field: {
//             path: 'src/fields/productSelector/companySelector.tsx',
//             clientProps: {
//               path: 'src/fields/productSelector/companySelector.tsx',
//               label: 'Company',
//             },
//           },
//         },
//       },
//     },
//     {
//       name: 'products',
//       label: 'Product',
//       type: 'text',
//       admin: {
//         components: {
//           Field: {
//             path: 'src/fields/productSelector/productSelector.tsx',
//             clientProps: {
//               path: 'src/fields/productSelector/productSelector.tsx',
//               label: 'Company',
//             },
//           },
//         },
//       },
//     },
//   ],
// };
