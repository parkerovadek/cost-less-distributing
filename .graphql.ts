import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset';

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema: 'https://shopify.dev/admin-graphql-direct-proxy/2024-10',
  documents: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  projects: {
    // To produce variable / return types for Admin API operations
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: '2024-10',
      documents: ['./src/app/**/*.{js,ts,jsx,tsx}'],
      outputDir: './src/app/types/storefront',
    }),
  },
};
