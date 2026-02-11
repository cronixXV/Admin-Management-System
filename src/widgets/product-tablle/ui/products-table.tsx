import { useProductsQuery, useTableStore } from '@/entities/product';

import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { queryClient } from '@/shared/api/query-сlient';
import { queryKeys } from '@/shared/api/query-keys';
import { EmptyState } from '@/shared/ui/empty-state/empty-state';

import { columns } from '../model/config/table-columns';
import { useSelectedProducts } from '../model/hooks/use-selected-products';
import { ProductsTableFooter } from './profile-table-footer';
import { productTableSx } from './product-table.styles';
import { useProductsParams } from '../model/hooks/use-products-params';
import { ProductsTableHeader } from './products-table-header';

export const ProductsTable = () => {
  const { page, pageSize, sortField, sortOrder, setPage, setPageSize, setSort } = useTableStore();

  const { selectedIds, toggleProduct, selectAll, deselectAll } = useSelectedProducts();

  const params = useProductsParams();

  const { data, isLoading, isFetching } = useProductsQuery(params);

  const allProductIds = data?.products.map((p) => p.id) || [];

  const handleSortChange = (model: GridSortModel) => {
    setPage(0);

    if (!model.length) {
      setSort();
      return;
    }

    setSort(model[0].field, model[0].sort ?? undefined);
  };

  const handleHeaderCheckboxChange = (checked: boolean, allIds: number[]) => {
    if (checked) {
      selectAll(allIds);
    } else {
      deselectAll();
    }
  };

  const handleRowCheckboxChange = (id: number) => {
    toggleProduct(id);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '83vh'
      }}
    >
      <ProductsTableHeader
        onRefresh={() => queryClient.invalidateQueries({ queryKey: queryKeys.products.all })}
      />

      <DataGrid
        rows={data?.products ?? []}
        rowCount={data?.total ?? 0}
        columns={columns({
          onHeaderCheckboxChange: handleHeaderCheckboxChange,
          onRowCheckboxChange: handleRowCheckboxChange,
          allProductIds,
          selectedIds
        })}
        loading={isLoading || isFetching}
        paginationMode="server"
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize={true}
        disableColumnMenu
        sortingMode="server"
        sortModel={sortField ? [{ field: sortField, sort: sortOrder }] : []}
        onSortModelChange={handleSortChange}
        disableRowSelectionOnClick
        rowHeight={71}
        getRowClassName={(params) =>
          selectedIds.has(params.row.id) ? 'selected-row-with-border' : ''
        }
        getRowId={(row) => row.id}
        slots={{
          pagination: null,
          noRowsOverlay: EmptyState
        }}
        sx={productTableSx}
        slotProps={{
          toolbar: {
            sx: {
              borderRadius: 0
            }
          }
        }}
      />

      <ProductsTableFooter
        page={page}
        pageSize={pageSize}
        total={data?.total || 0}
        onPageChange={setPage}
      />
    </Box>
  );
};
