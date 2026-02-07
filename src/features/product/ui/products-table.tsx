import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useProductsQuery, useTableStore } from '@/entities/product';
import { columns } from '../model/config/table-columns';

import { useSelectedProducts } from '../model/hooks/use-selected-products';

export const ProductsTable = () => {
  const { page, pageSize, sortField, sortOrder, setPage, setPageSize, setSort } = useTableStore();
  const { selectedIds, toggleProduct, selectAll, deselectAll, getSelectedIds } =
    useSelectedProducts();

  const { data, isLoading } = useProductsQuery({
    limit: pageSize,
    skip: page * pageSize,
    sortBy: sortField,
    order: sortOrder
  });

  const allProductIds = data?.products.map((p) => p.id) || [];

  const handleSortChange = (model: GridSortModel) => {
    if (!model.length) return setSort();
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

  console.log('Выбранные продукты:', getSelectedIds());

  return (
    <Box
      sx={{
        width: '100%',
        height: '82vh'
      }}
    >
      <DataGrid
        rows={data?.products ?? []}
        rowCount={data?.total ?? 0}
        columns={columns({
          onHeaderCheckboxChange: handleHeaderCheckboxChange,
          onRowCheckboxChange: handleRowCheckboxChange,
          allProductIds,
          selectedIds
        })}
        loading={isLoading}
        paginationMode="server"
        sortingMode="server"
        pageSizeOptions={[10, 20, 50]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        onSortModelChange={handleSortChange}
        disableRowSelectionOnClick
        sx={{
          borderRadius: 0,
          border: 'none',
          height: '100%',

          '& .MuiDataGrid-columnHeader': {
            height: '73px !important',
            minHeight: '73px !important',
            maxHeight: '73px !important',
            lineHeight: '73px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: '#b2b3b9'
          },

          '& .MuiDataGrid-columnHeaders': {
            height: '73px !important',
            minHeight: '73px !important',
            borderRadius: 0
          },

          '& .MuiDataGrid-columnHeaderTitle': {
            lineHeight: '73px',
            fontWeight: 700
          },

          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }
        }}
        slotProps={{
          toolbar: {
            sx: {
              borderRadius: 0
            }
          }
        }}
      />
    </Box>
  );
};
