import { PayloadRedirects } from '@/components/PayloadRedirects';
import { getProductByHandle, getProducts } from '@/services/shopify';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    params: { product: product.handle },
  }));
}

export default async function ProductPage({ params }) {
  const productData = await getProductByHandle(params.product);

  if (!productData) {
    return <PayloadRedirects url="/" />;
  }

  const { title } = productData;

  return <div>{title}</div>;
}
