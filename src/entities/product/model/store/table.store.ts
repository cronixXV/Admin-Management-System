import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TSortOrder = 'asc' | 'desc';

interface ITableState {
  search: string;
  page: number;
  pageSize: number;

  sortBy?: string;
  order?: TSortOrder;

  columnWidths: Record<string, number>;

  setSearch: (v: string) => void;
  setPage: (v: number) => void;
  setPageSize: (v: number) => void;
  setSort: (field: string, order: TSortOrder) => void;
  setColumnWidth: (field: string, width: number) => void;
}

export const useTableStore = create<ITableState>()(
  persist(
    (set) => ({
      search: '',
      page: 0,
      pageSize: 10,

      sortBy: undefined,
      order: undefined,

      columnWidths: {},

      setSearch: (search) => set({ search }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize }),

      setSort: (sortBy, order) =>
        set({
          sortBy,
          order
        }),

      setColumnWidth: (field, width) =>
        set((state) => ({
          columnWidths: {
            ...state.columnWidths,
            [field]: width
          }
        }))
    }),
    {
      name: 'products-table-storage'
    }
  )
);
