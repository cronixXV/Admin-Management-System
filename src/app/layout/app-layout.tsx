import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

export const AppLayout = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" sx={{ backgroundColor: '#f3f3f3' }}>
      <Header />

      <Box overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
};
