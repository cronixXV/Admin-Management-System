import { useEffect, useState } from 'react';

import { Stack, Typography, IconButton, Button } from '@mui/material';

import ArrowLeft from '@/shared/assets/icons/arrow-left.svg';
import ArrowRight from '@/shared/assets/icons/arrow-right.svg';

interface IProductsTableFooterProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const ProductsTableFooter = ({
  page,
  pageSize,
  total,
  onPageChange
}: IProductsTableFooterProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const [start, setStart] = useState(1);

  useEffect(() => {
    const current = page + 1;

    if (current > start + 4) {
      setStart(current - 4);
    } else if (current < start) {
      setStart(current);
    }
  }, [page, start]);

  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i).filter(
    (p) => p <= totalPages
  );

  const from = total > 0 ? page * pageSize + 1 : 0;
  const to = Math.min((page + 1) * pageSize, total);

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 30px',
        minHeight: '82px',
        width: '100%',
        backgroundColor: '#fff'
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography sx={{ fontSize: '18px', color: '#969b9f' }}>Показано</Typography>

        <Typography sx={{ fontSize: '18px', color: '#333' }}>
          {from}-{to}
        </Typography>

        <Typography sx={{ fontSize: '18px', color: '#969b9f' }}>из</Typography>

        <Typography sx={{ fontSize: '18px', color: '#333' }}>{total}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={page === 0}
          sx={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: page === 0 ? '#f0f0f0' : '#ffffff',
            color: page === 0 ? '#cccccc' : '#3c538e'
          }}
        >
          <ArrowLeft width={20} height={20} />
        </IconButton>

        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            onClick={() => onPageChange(pageNum - 1)}
            sx={{
              minWidth: '30px',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              fontSize: '14px',
              color: page === pageNum - 1 ? '#fff' : '#b2b3b9',
              backgroundColor: page === pageNum - 1 ? '#797fea' : '#ffffff',
              '&:hover': {
                backgroundColor: page === pageNum - 1 ? '#797fea' : '#f5f5f5'
              }
            }}
          >
            {pageNum}
          </Button>
        ))}

        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1 || totalPages === 0}
          sx={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: page >= totalPages - 1 || totalPages === 0 ? '#f0f0f0' : '#ffffff',
            color: page >= totalPages - 1 || totalPages === 0 ? '#cccccc' : '#3c538e'
          }}
        >
          <ArrowRight width={20} height={20} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
