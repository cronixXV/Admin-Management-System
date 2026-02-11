import { Stack, Typography } from '@mui/material';

export const EmptyState = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    <Typography
      fontSize={18}
      fontWeight={500}
      color="text.secondary"
      fontFamily={'Inter, sans-serif'}
    >
      Ничего не найдено
    </Typography>
  </Stack>
);
