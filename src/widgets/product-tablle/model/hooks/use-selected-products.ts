import { useState, useCallback } from 'react';

export const useSelectedProducts = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleProduct = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((productIds: number[]) => {
    setSelectedIds(new Set(productIds));
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id: number) => {
      return selectedIds.has(id);
    },
    [selectedIds]
  );

  const getSelectedIds = useCallback(() => {
    return Array.from(selectedIds);
  }, [selectedIds]);

  const areAllSelected = useCallback(
    (productIds: number[]) => {
      if (productIds.length === 0) return false;
      return productIds.every((id) => selectedIds.has(id));
    },
    [selectedIds]
  );

  return {
    selectedIds,
    isSelected,
    toggleProduct,
    selectAll,
    deselectAll,
    getSelectedIds,
    areAllSelected
  };
};
