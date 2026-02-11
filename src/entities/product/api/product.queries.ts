import { useQuery, useMutation } from '@tanstack/react-query';

import { productService, type IProductsParams } from './product.service';

import { queryKeys } from '@/shared/api/query-keys';
import { queryClient } from '@/shared/api/query-сlient';

export const useProductsQuery = (params?: IProductsParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productService.getProducts(params),

    select: (data) => ({
      ...data,
      products: data.products.map((p) => ({
        ...p,
        sku: `SKU-${p.id}`
      }))
    })
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: any }) => productService.updateProduct(id, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    }
  });
};

export const useAddProductMutation = () => {
  return useMutation({
    mutationFn: productService.addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    }
  });
};
