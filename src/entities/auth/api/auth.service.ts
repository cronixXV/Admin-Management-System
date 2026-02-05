import { http } from '@/shared/api/axios-instance';
import type { LoginDto, LoginResponse } from '../model/types/types';

export const authService = {
  login: async (data: LoginDto) => {
    const res = await http.post<LoginResponse>('/auth/login', data);
    return res.data;
  }
};
