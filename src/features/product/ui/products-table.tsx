import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useProductsQuery, useTableStore } from '@/entities/product';
import { columns } from '../model/config/table-columns';
import { useDebounce } from '@/shared/lib/use-debounce';
import { useSelectedProducts } from '../model/hooks/use-selected-products';
import { ProductsTableHeader } from '@/features/product/ui/products-table-header';
import { useMemo } from 'react';
import { queryClient } from '@/shared/api/query-сlient';
import { queryKeys } from '@/shared/api/query-keys';
import { ProductsTableFooter } from './profile-table-footer';

export const ProductsTable = () => {
  const { page, pageSize, sortField, sortOrder, setPage, setPageSize, setSort } = useTableStore();
  const { selectedIds, toggleProduct, selectAll, deselectAll } = useSelectedProducts();

  const search = useTableStore((s) => s.search);

  const debouncedSearch = useDebounce(search, 1000);

  const params = useMemo(
    () => ({
      limit: pageSize,
      skip: page * pageSize,
      sortBy: sortField,
      order: sortOrder,
      q: debouncedSearch
    }),
    [pageSize, page, sortField, sortOrder, debouncedSearch]
  );

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
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize={true}
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
          pagination: null
        }}
        sx={{
          borderRadius: 0,
          border: 'none',
          height: '100%',
          maxHeight: '620px',
          padding: '0px 30px',
          '& .MuiDataGrid-columnHeader': {
            height: '73px !important',
            minHeight: '73px !important',
            maxHeight: '73px !important',
            lineHeight: '73px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: '#b2b3b9',
            cursor: 'default !important'
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
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .selected-row-with-border': {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              backgroundColor: '#3c538e',
              zIndex: 1
            }
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none'
          },
          '& .MuiDataGrid-cell:active': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeader:active': {
            outline: 'none'
          },
          '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
            userSelect: 'none'
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

      <ProductsTableFooter
        page={page}
        pageSize={pageSize}
        total={data?.total || 0}
        onPageChange={setPage}
      />
    </Box>
  );
};
