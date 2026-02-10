import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProductSchema, type AddProductForm } from '@/entities/product';
import { useAddProductMutation } from '@/entities/product';
import { toast } from 'sonner';

interface IAddProductModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ open, onClose }: IAddProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema)
  });

  const { mutate, isPending } = useAddProductMutation();

  const onSubmit = (data: AddProductForm) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Товар добавлен');
        reset();
        onClose();
      },
      onError: () => {
        toast.error('Ошибка добавления');
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить товар</DialogTitle>

      <DialogContent>
        <Stack gap={2} mt={1}>
          <TextField
            label="Название"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Вендор"
            {...register('brand')}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />

          <TextField
            type="number"
            label="Цена"
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            type="number"
            label="Количество"
            {...register('stock')}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            width: '140px',
            height: '42px',
            padding: '10px 20px',
            borderRadius: '6px',
            backgroundColor: '#fff',
            color: 'black'
          }}
          onClick={onClose}
        >
          <Typography fontFamily={'Cairo, sans-serif'} fontWeight={600} fontSize={'14px'}>
            Отмена
          </Typography>
        </Button>
        <Button
          sx={{
            width: '140px',
            height: '42px',
            padding: '10px 20px',
            borderRadius: '6px',
            backgroundColor: '#242EDB',
            color: '#ebf3ea'
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          <Typography fontFamily={'Cairo, sans-serif'} fontWeight={600} fontSize={'14px'}>
            Сохранить
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
