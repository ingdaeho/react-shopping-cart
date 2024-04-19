import { useState, useCallback, useMemo } from 'react';
import { Cart } from '../../../types';

export const useSelectItems = (data: Cart[]) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const isAllSelected = useMemo(() => {
    return data.length > 0 && data.every(({ id }) => selectedItems[id]);
  }, [data, selectedItems]);

  const toggleItemSelection = useCallback((itemId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }, []);

  const toggleAllItemsSelection = useCallback(() => {
    if (isAllSelected) {
      setSelectedItems({});
    } else {
      const newSelectedItems = data.reduce(
        (acc, { id }) => ({ ...acc, [id]: true }),
        {}
      );
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
