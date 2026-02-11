import { z } from 'zod';

export const addProductSchema = z.object({
  title: z.string().min(3, 'Введите название'),
  brand: z.string().min(3, 'Введите вендора'),

  price: z
    .string()
    .min(1, 'Введите цену')
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), 'Введите число')
    .refine((v) => v >= 0, 'Цена должна быть больше 0'),

  stock: z
    .string()
    .min(1, 'Введите количество')
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), 'Введите число')
    .refine((v) => v >= 0, 'Количество должно быть больше 0')
});

export type AddProductFormInput = z.input<typeof addProductSchema>;
export type AddProductForm = z.output<typeof addProductSchema>;
