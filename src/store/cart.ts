import { create } from 'zustand';
import { Cart } from '../types';

interface CartState {
  items: Cart['product'][];
  setItems: (items: Cart[]) => void;
  handleQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  setItems: (items: Cart[]) => {
    const itemMap = new Map<Cart['product']['id'], Cart['product']>();

    items.forEach((item) => {
      const { id, name, price, imageUrl } = item.product;
      if (itemMap.has(id)) {
        const item = itemMap.get(id);
        item!.quantity = item!.quantity! + 1;
      } else {
        itemMap.set(id, { id, name, price, imageUrl, quantity: 1 });
      }
    });

    const newItems = Array.from(itemMap.values());

    return set({ items: newItems });
  },
  handleQuantity: (id: number, quantity: number) => {
    set((state) => {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });
  },
}));
