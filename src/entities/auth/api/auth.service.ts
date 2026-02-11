import { http } from '@/shared/api/axios-instance';

import type { ILoginDto, ILoginResponse } from '../model/types/types';

export const authService = {
  login: async (data: ILoginDto) => {
    const res = await http.post<ILoginResponse>('/auth/login', data);
    return res.data;
  }
};
