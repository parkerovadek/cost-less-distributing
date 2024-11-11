import { PayloadRedirects } from '@/components/PayloadRedirects';
import { getCollections, getCollectionsByHandle } from '@/services/shopify';
import { ProductsFacetedSearchProvider } from '../products-faceted-search-context';
import { ProductsSearch } from '../products-faceted-search';

export const dynamicParams = false;

export async function generateStaticParams() {
  const collections = await getCollections();

  return collections.map(({ node }) => ({
    params: { collection: node.handle },
  }));
}

export default async function CollectionPage({ params }) {
  const collectionData = await getCollectionsByHandle(params.collection);

  if (!collectionData) {
    return <PayloadRedirects url="/" />;
  }

  const { title } = collectionData;

  return (
    <ProductsFacetedSearchProvider>
      <ProductsSearch collectionName={title} />
    </ProductsFacetedSearchProvider>
  );
}
