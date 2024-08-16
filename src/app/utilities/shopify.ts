import '@shopify/shopify-api/adapters/node'
import {restResources} from '@shopify/shopify-api/rest/admin/2024-07';
import {shopifyApi, ApiVersion } from '@shopify/shopify-api';
import {createAdminRestApiClient} from '@shopify/admin-api-client';

export const admin = createAdminRestApiClient({
  accessToken: process.env.SHOPIFY_API_KEY,
  apiVersion: '2024-10',
  storeDomain: '337465-f2.myshopify.com',
});

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products'],
  hostName: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  apiVersion: ApiVersion.July24,
  isEmbeddedApp: false,
  restResources
});
