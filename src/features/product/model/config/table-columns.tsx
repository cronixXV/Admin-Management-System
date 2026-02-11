import { Box, IconButton, Stack, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import Dots from '@/shared/assets/icons/dots.svg';

import type { IProductRow } from '@/entities/product';
import { formatMoney } from '@/shared/lib/format-price';

import Checkbox from '@/shared/assets/icons/checkbox.svg';
import CheckboxFill from '@/shared/assets/icons/checkbox-fill.svg';
import { formatTextToTitleCase } from '@/shared/lib/format-text';

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
    headerAlign: 'left',
    align: 'left',
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: 'Circe, sans-serif',
                fontWeight: 700,
                fontSize: '16p',
                color: '#161919'
              }}
            >
              {params.row.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Circe, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#b2b3b9'
              }}
            >
              {formatTextToTitleCase(params.row.category)}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  {
    field: 'brand',
    headerName: 'Вендор',
    flex: 1,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <Typography
            sx={{
              fontFamily: 'Open, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: '#161919'
            }}
          >
            {params.row.brand}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'sku',
    headerName: 'Артикул',
    flex: 1,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography
          sx={{
            fontFamily: 'Open, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#161919'
          }}
        >
          {params.row.sku}
        </Typography>
      </Box>
    )
  },
  {
    field: 'rating',
    headerName: 'Оценка',
    flex: 1,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography
          sx={{
            fontSize: '16px',
            color: params.value < 3 ? '#d32f2f' : undefined,
            fontWeight: 400,
            fontFamily: 'Open, sans-serif'
          }}
        >
          {params.row.rating}
        </Typography>
      </Box>
    )
  },
  {
    field: 'price',
    headerName: 'Цена, ₽',
    flex: 1,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Open, sans-serif'
            }}
          >
            {formatMoney(params.row.price, 'RUB', 76.79)}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'stock',
    headerName: 'Количество',
    flex: 1,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Open, sans-serif'
            }}
          >
            {params.row.stock}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'actions',
    headerName: '',
    width: 110,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: () => (
      <Stack flexDirection={'row'} gap={'32px'} alignItems={'center'} justifyContent="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '23px',
            padding: '4px',
            width: '52px',
            height: '27px',
            backgroundColor: '#242edb'
          }}
        >
          <IconButton size="small">
            <Add fontSize="small" style={{ color: '#fff' }} />
          </IconButton>
        </Box>

        <Box>
          <IconButton size="small">
            <Dots width={26} height={26} />
          </IconButton>
        </Box>
      </Stack>
    )
  }
];
