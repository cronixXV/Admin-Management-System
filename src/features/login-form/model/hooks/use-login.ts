import { useLoginMutation } from '@/entities/auth';
import { useAuthStore } from '@/entities/auth';

import type { LoginFormValues } from '../schemas/login-schema';

export const useLogin = () => {
  const setRemember = useAuthStore((s) => s.setRemember);
  const loginStore = useAuthStore((s) => s.login);
  const { mutateAsync, isPending } = useLoginMutation();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setRemember(values.remember);

      const res = await mutateAsync({
        username: values.username,
        password: values.password
      });

      loginStore(res.accessToken);

      return res;
    } catch (e: any) {
      throw new Error(e?.response?.data?.message || 'Login failed');
    }
  };

  return {
    handleLogin,
    isPending
  };
};
