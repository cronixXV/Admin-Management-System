import { useAuthStore } from '@/entities/auth';
import { Button, Stack, Typography, Switch } from '@mui/material';

export const LoginPage = () => {
  const { token, remember, login, logout, setRemember } = useAuthStore();

  return (
    <Stack spacing={2} p={4}>
      <Typography>Token: {token ?? 'null'}</Typography>
      <Typography>Remember: {String(remember)}</Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => login('fake-token')}>
          Login
        </Button>

        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>

        <Switch checked={remember} onChange={(e) => setRemember(e.target.checked)} />
      </Stack>
    </Stack>
  );
};
