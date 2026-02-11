import { useState } from 'react';

import { AddProductModal } from '@/features/product';

import { Box, Button, Stack, Typography } from '@mui/material';

import Add from '@/shared/assets/icons/add.svg';
import Refresh from '@/shared/assets/icons/refresh.svg';
import Filter from '@/shared/assets/icons/filter.svg';

interface IProductsTableHeaderProps {
  onRefresh: () => void;
}

export const ProductsTableHeader = ({ onRefresh }: IProductsTableHeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: '#fff',
        minHeight: '112px',
        padding: '0px 30px'
      }}
    >
      <Typography
        fontSize={'20px'}
        fontWeight={700}
        color={'#333'}
        fontFamily={'Inter, sans-serif'}
      >
        Все позиции
      </Typography>

      <Stack direction={'row'} justifyContent={'flex-end'} gap={'8px'} alignItems={'center'}>
        <Box>
          <Button
            onClick={onRefresh}
            sx={{
              minWidth: 'auto',
              padding: '8px',
              borderRadius: '8px'
            }}
            aria-label="Обновить таблицу"
          >
            <Refresh width={42} height={42} />
          </Button>
          <Button
            sx={{ minWidth: 'auto', padding: '8px', borderRadius: '8px' }}
            aria-label="Фильтры"
          >
            <Filter width={42} height={42} />
          </Button>
        </Box>

        <Button
          sx={{
            width: '147px',
            height: '42px',
            padding: '10px 20px',
            borderRadius: '6px',
            backgroundColor: '#242EDB',
            color: '#ebf3ea'
          }}
          onClick={() => setOpen(true)}
        >
          <Add width={22} height={22} style={{ marginRight: '6px' }} />
          <Typography fontFamily={'Cairo, sans-serif'} fontWeight={600} fontSize={'14px'}>
            Добавить
          </Typography>
        </Button>
      </Stack>

      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
};
