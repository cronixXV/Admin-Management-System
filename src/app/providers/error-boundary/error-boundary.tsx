import { ErrorBoundary } from 'react-error-boundary';
import { Button, Stack, Typography } from '@mui/material';

export const AppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <Stack height="100vh" alignItems="center" justifyContent="center" spacing={2}>
          <Typography>Что-то пошло не так</Typography>
          <Button variant="contained" onClick={resetErrorBoundary}>
            Обновить
          </Button>
        </Stack>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
