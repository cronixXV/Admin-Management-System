export const queryKeys = {
  auth: ['auth'] as const,

  products: {
    all: ['products'] as const,
    list: (params?: unknown) => ['products', 'list', params] as const,
    byId: (id: number) => ['products', id] as const
  }
};
