export { productService } from './api/product.service';
export {
  useProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation
} from './api/product.queries';
export { useTableStore } from './model/store/table.store';
export { addProductSchema } from './model/schemas/schema';
export type { IProductRow, IProductsResponse, IProduct } from './model/types/types';
export type { AddProductForm, AddProductFormInput } from './model/schemas/schema';
