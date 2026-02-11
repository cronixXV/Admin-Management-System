import { useMemo } from 'react';

import { useTableStore } from '@/entities/product';
import { useDebounce } from '@/shared/lib/use-debounce';

export const useProductsParams = () => {
  const { page, pageSize, sortField, sortOrder, search } = useTableStore();
  const debouncedSearch = useDebounce(search, 1000);

  return useMemo(
    () => ({
      limit: pageSize,
      skip: page * pageSize,
      sortBy: sortField,
      order: sortOrder,
      q: debouncedSearch
    }),
    [pageSize, page, sortField, sortOrder, debouncedSearch]
  );
};
