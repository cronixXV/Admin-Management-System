import { Typography, Stack, TextField, Box, InputAdornment } from '@mui/material';
import { useTableStore } from '@/entities/product';

import Search from '@/shared/assets/icons/search.svg';
import Language from '@/shared/assets/icons/language.svg';
import Message from '@/shared/assets/icons/message.svg';
import Notification from '@/shared/assets/icons/notification.svg';
import Settings from '@/shared/assets/icons/settings.svg';

export const Header = () => {
  const search = useTableStore((s) => s.search);
  const setSearch = useTableStore((s) => s.setSearch);
  return (
    <Stack
      width={'100%'}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'25px 30px'}
      mt={'20px'}
      mb={'30px'}
      sx={{
        backgroundColor: ' #fff'
      }}
    >
      <Box mr={'249px'}>
        <Typography
          fontFamily={'Inter, sans-serif'}
          fontWeight={700}
          fontSize={'24px'}
          color={'#202020'}
        >
          Товары
        </Typography>
      </Box>

      <Box
        width={'100%'}
        maxHeight={'48px'}
        display={'flex'}
        alignItems={'center'}
        mr={'146px'}
        borderRadius={'8px'}
        sx={{
          backgroundColor: '#f3f3f3'
        }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              borderRadius: '8px',
              '& fieldset': {
                border: 'none'
              },
              '&:hover fieldset': {
                border: 'none'
              },
              '&.Mui-focused fieldset': {
                border: 'none'
              }
            }
          }}
          slotProps={{
            input: {
              sx: {
                padding: '8px 12px',
                boxSizing: 'border-box'
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Search width={24} height={24} />
                </InputAdornment>
              )
            }
          }}
        />
      </Box>

      <Box
        display={'flex'}
        mr={'146px'}
        sx={{
          flexShrink: 0,
          width: '1px',
          height: '56px',
          backgroundColor: '#c2c2c2',
          opacity: 0.5
        }}
      />

      <Stack direction={'row'} alignItems={'center'} gap={'30px'}>
        <Language width={28} height={28} cursor={'pointer'} />
        <Message width={28} height={28} cursor={'pointer'} />
        <Notification width={28} height={28} cursor={'pointer'} />
        <Settings width={28} height={28} cursor={'pointer'} />
      </Stack>
    </Stack>
  );
};
