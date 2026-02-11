import { LoginForm } from '@/features/login-form';

import { Box } from '@mui/material';

export const LoginPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <LoginForm />
    </Box>
  );
};
