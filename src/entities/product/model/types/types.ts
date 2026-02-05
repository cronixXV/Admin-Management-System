export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  sku?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
