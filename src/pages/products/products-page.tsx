import { useProductsQuery } from '@/entities/product';

export const ProductsPage = () => {
  const { data, isLoading } = useProductsQuery({ limit: 10 });

  if (isLoading) return <div>Loading...</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
