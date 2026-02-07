import { Box } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

import type { IProductRow } from '@/entities/product';
import { formatMoney } from '@/shared/lib/format-price';

import Checkbox from '@/shared/assets/icons/checkbox.svg';
import CheckboxFill from '@/shared/assets/icons/checkbox-fill.svg';

interface IColumnsProps {
  onHeaderCheckboxChange?: (checked: boolean, allIds: number[]) => void;
  onRowCheckboxChange?: (id: number) => void;
  allProductIds: number[];
  selectedIds: Set<number>;
}

export const columns = ({
  onHeaderCheckboxChange,
  onRowCheckboxChange,
  allProductIds,
  selectedIds
}: IColumnsProps): GridColDef<IProductRow>[] => [
  {
    field: 'title',
    headerName: 'Наименование',
    flex: 1.2,
    minWidth: 180,
    renderHeader: () => {
      const areAllSelected =
        allProductIds.length > 0 && allProductIds.every((id) => selectedIds.has(id));

      const handleHeaderCheckboxChange = () => {
        onHeaderCheckboxChange?.(!areAllSelected, allProductIds);
      };

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
          {areAllSelected ? (
            <CheckboxFill
              onClick={handleHeaderCheckboxChange}
              style={{ cursor: 'pointer', width: 20, height: 20 }}
            />
          ) : (
            <Checkbox
              onClick={handleHeaderCheckboxChange}
              style={{ cursor: 'pointer', width: 20, height: 20 }}
            />
          )}
          <span>Наименование</span>
        </Box>
      );
    },
    renderCell: (params) => {
      const isChecked = selectedIds.has(params.row.id);

      const handleRowCheckboxChange = () => {
        onRowCheckboxChange?.(params.row.id);
      };

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
          {isChecked ? (
            <CheckboxFill
              onClick={handleRowCheckboxChange}
              style={{ cursor: 'pointer', width: 20, height: 20 }}
            />
          ) : (
            <Checkbox
              onClick={handleRowCheckboxChange}
              style={{ cursor: 'pointer', width: 20, height: 20 }}
            />
          )}
          <span>{params.value}</span>
        </Box>
      );
    }
  },
  {
    field: 'brand',
    headerName: 'Вендор',
    flex: 1,
    minWidth: 80
  },
  {
    field: 'sku',
    headerName: 'Артикул',
    flex: 1,
    minWidth: 80
  },
  {
    field: 'rating',
    headerName: 'Оценка',
    flex: 1,
    minWidth: 80,
    renderCell: (params) => (
      <span
        style={{
          color: params.value < 3 ? '#d32f2f' : undefined,
          fontWeight: 600
        }}
      >
        {params.value}
      </span>
    )
  },
  {
    field: 'price',
    headerName: 'Цена, ₽',
    flex: 1,
    minWidth: 80,
    renderCell: (params) => formatMoney(params.row.price, 'RUB', 76.79)
  },
  {
    field: 'stock',
    headerName: 'Количество',
    flex: 1,
    minWidth: 80
  }
];
