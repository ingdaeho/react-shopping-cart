import { useState, useCallback, useMemo } from 'react';
import { useCartStore } from '../../../store/cart';

export const useSelectItems = () => {
  const cartItems = useCartStore((state) => state.items);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const isAllSelected = useMemo(() => {
    return (
      cartItems.length > 0 && cartItems.every(({ id }) => selectedItems.has(id))
    );
  }, [cartItems, selectedItems]);

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
      const newSelectedItems = new Set(cartItems.map(({ id }) => id));
      setSelectedItems(newSelectedItems);
    }
  }, [cartItems, isAllSelected]);

  return {
    isAllSelected,
    selectedItems,
    toggleItemSelection,
    toggleAllItemsSelection,
  };
};
