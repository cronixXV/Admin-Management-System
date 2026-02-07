export { productService } from './api/product.service';
export {
  useProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation
} from './api/product.queries';
export { useTableStore } from './model/store/table.store';
export type { IProductRow, IProductsResponse, IProduct } from './model/types/types';
