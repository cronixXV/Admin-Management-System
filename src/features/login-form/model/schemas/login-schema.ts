import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(4, 'Имя пользователя обязательно'),
  password: z.string().min(4, 'Пароль обязателен'),
  remember: z.boolean()
});

export type LoginFormValues = z.infer<typeof loginSchema>;
