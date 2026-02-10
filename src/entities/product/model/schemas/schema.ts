import { z } from 'zod';

export const addProductSchema = z.object({
  title: z.string().min(3, 'Введите название'),
  brand: z.string().min(3, 'Введите вендора'),
  price: z.number().min(0, 'Цена должна быть больше 0'),
  stock: z.number().min(0, 'Количество должно быть больше 0')
});

export type AddProductForm = z.infer<typeof addProductSchema>;
