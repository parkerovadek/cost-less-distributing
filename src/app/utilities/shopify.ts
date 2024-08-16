import Client from 'shopify-buy';

export const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  apiVersion: '2024-10'
});
