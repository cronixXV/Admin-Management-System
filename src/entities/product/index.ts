export type { IProduct, IProductsResponse } from './model/types/types';
export { productService } from './api/product.service';
export {
  useProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation
} from './api/product.queries';
export { useTableStore } from './model/store/table.store';
