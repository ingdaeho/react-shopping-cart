import { useState, useCallback, useMemo } from 'react';
import { Cart } from '../../../types';

export const useSelectItems = (data: Cart[]) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const isAllSelected = useMemo(() => {
    return data.length > 0 && data.every(({ id }) => selectedItems.has(id));
  }, [data, selectedItems]);

  const toggleItemSelection = useCallback((itemId: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  }, []);

  const toggleAllItemsSelection = useCallback(() => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      const newSelectedItems = new Set(data.map(({ id }) => id));
      setSelectedItems(newSelectedItems);
    }
  }, [data, isAllSelected]);

  return {
    isAllSelected,
    selectedItems,
    toggleItemSelection,
    toggleAllItemsSelection,
  };
};
