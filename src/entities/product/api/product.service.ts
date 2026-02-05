import { http } from '@/shared/api/axios-instance';
import type { ProductsResponse } from '../model/types/types';

export interface ProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const productService = {
  getProducts: async (params?: ProductsParams) => {
    const res = await http.get<ProductsResponse>('/products', { params });
    return res.data;
  },

  searchProducts: async (q: string) => {
    const res = await http.get<ProductsResponse>(`/products/search?q=${q}`);
    return res.data;
  }
};
