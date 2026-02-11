export interface IProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  sku?: string;
  category: string;
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductRow {
  id: number;
  title: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  stock: number;
  category: string;
}
