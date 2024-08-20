import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  apiVersion: '2024-10',
});
