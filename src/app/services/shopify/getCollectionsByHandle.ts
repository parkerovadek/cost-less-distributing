'use server';
import { shopifyClient } from '@/utilities/shopifyClient';

export const getCollectionsByHandle = async (handle: string) => {
  const request = await shopifyClient.fetch(
    `#graphql
      query CollectionsByHandle {
        collectionByHandle(handle: "${handle}") {
          title
        }
      }
    `,
  );

  const {
    data: { collectionByHandle },
  } = await request.json();

  return collectionByHandle;
};
