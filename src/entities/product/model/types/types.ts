export interface IProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  sku?: string;
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
