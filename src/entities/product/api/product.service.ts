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

  updateProduct: async (id: number, body: Partial<any>) => {
    const res = await http.patch(`/products/${id}`, body);
    return res.data;
  },

  addProduct: async (body: Partial<any>) => {
    const res = await http.post('/products/add', body);
    return res.data;
  }
};
