export type { Product, ProductsResponse } from './model/types/types';
export { productService } from './api/product.service';
export {
  useProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation
} from './api/product.queries';
