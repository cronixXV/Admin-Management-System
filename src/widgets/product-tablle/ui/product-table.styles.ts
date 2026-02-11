import type { SxProps, Theme } from '@mui/material';

export const productTableSx: SxProps<Theme> = {
  borderRadius: 0,
  border: 'none',
  height: '100%',
  maxHeight: '620px',
  padding: '0px 30px',
  '& .MuiDataGrid-columnHeader': {
    height: '73px !important',
    minHeight: '73px !important',
    maxHeight: '73px !important',
    lineHeight: '73px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 700,
    color: '#b2b3b9',
    cursor: 'default !important'
  },
  '& .MuiDataGrid-columnHeaders': {
    height: '73px !important',
    minHeight: '73px !important',
    borderRadius: 0
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    lineHeight: '73px',
    fontWeight: 700
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none'
  },
  '& .selected-row-with-border': {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '5px',
      backgroundColor: '#3c538e',
      zIndex: 1
    }
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none'
  },
  '& .MuiDataGrid-cell:active': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:active': {
    outline: 'none'
  },
  '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
    userSelect: 'none'
  }
};
