import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import LogoAuth from '@/shared/assets/icons/logo-auth.svg';
import Eye from '@/shared/assets/icons/eye.svg';
import Email from '@/shared/assets/icons/email.svg';
import Password from '@/shared/assets/icons/password.svg';

import {
  Button,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Box,
  Link
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';

import { loginSchema, type LoginFormValues } from '../model/schemas/login-schema';
import { useLogin } from '../model/hooks/use-login';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: true
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await handleLogin(values);
      toast.success('Вход успешен');
      navigate('/products');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        borderRadius: '40px',
        padding: '6px',
        width: '540px',
        minHeight: '740px',
        boxShadow: '0 24px 32px 0 rgba(0, 0, 0, 0.04)',
        background: '#fff'
      }}
    >
      <Paper
        sx={{
          padding: '48px 58px',
          minWidth: '527px',
          minHeight: '716px',
          borderRadius: '34px',
          background: 'linear-gradient(180deg, rgba(35, 35, 35, 0.03) 0%, rgba(35, 35, 35, 0) 50%)'
        }}
      >
        <Stack width={'100%'}>
          <Box display="flex" justifyContent="center" mb={'32px'}>
            <LogoAuth width={'52px'} height={'52px'} />
          </Box>

          <Box display="flex" flexDirection="column" alignItems={'center'} gap={'12px'} mb={'32px'}>
            <Typography
              fontSize={'40px'}
              fontWeight={600}
              fontFamily={'Inter, sans-serif'}
              color={'#232323'}
            >
              Добро пожаловать!
            </Typography>
            <Typography
              fontSize={'18px'}
              fontWeight={500}
              fontFamily={'Inter, sans-serif'}
              color={'#e0e0e0'}
            >
              Пожалуйста, авторизируйтесь
            </Typography>
          </Box>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={'16px'}>
            <Typography
              fontWeight={500}
              fontSize={'18px'}
              fontFamily={'Inter, sans-serif'}
              color={'#232323'}
            >
              Имя пользователя
            </Typography>

            <TextField
              placeholder="Введите имя пользователя"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email width={'24px'} height={'24px'} />
                    </InputAdornment>
                  )
                }
              }}
            />

            <Typography
              fontWeight={500}
              fontSize={'18px'}
              fontFamily={'Inter, sans-serif'}
              color={'#232323'}
            >
              Пароль
            </Typography>

            <TextField
              placeholder="Введите пароль"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password width={'24px'} height={'24px'} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                        {showPassword ? <Eye /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            <FormControlLabel
              control={<Checkbox sx={{ color: '#9c9c9c' }} {...register('remember')} />}
              label="Запомнить данные"
              sx={{
                color: '#9c9c9c',
                fontWeight: 500,
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif'
              }}
            />

            <Button
              type="submit"
              disabled={isPending}
              sx={{
                border: '1px solid #367af',
                borderRadius: '12px',
                padding: '16px 8px',
                width: '399px',
                height: '54px',
                boxShadow:
                  'inset 0 -2px 0 1px rgba(0, 0, 0, 0.08), 0 8px 8px 0 rgba(54, 122, 255, 0.03)',
                background: '#242edb',
                color: '#fff'
              }}
            >
              <Typography fontWeight={500} fontSize={'18px'} fontFamily={'Inter, sans-serif'}>
                Войти
              </Typography>
            </Button>
          </Stack>
        </form>

        <Stack width={'100%'} flexDirection={'column'} alignItems="center" mt={'16px'}>
          <Box width={'100%'} display={'flex'} alignItems="center" mb={'32px'} gap="16px">
            <Box sx={{ flex: 1, width: '100%', height: '1px', backgroundColor: '#ededed' }} />
            <Typography
              fontWeight={500}
              fontSize={'16px'}
              fontFamily={'Inter, sans-serif'}
              color={'#ebebeb'}
            >
              Или
            </Typography>
            <Box sx={{ flex: 1, width: '100%', height: '1px', backgroundColor: '#ededed' }} />
          </Box>

          <Typography
            fontWeight={500}
            fontSize={'18px'}
            fontFamily={'Inter, sans-serif'}
            color={'#6c6c6c'}
          >
            Нет аккаута?{' '}
            <Link
              sx={{
                fontWeight: 600,
                textDecoration: 'underline',
                textDecorationSkipInk: 'none',
                color: '#242edb'
              }}
              href="/#"
            >
              Создать
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};
