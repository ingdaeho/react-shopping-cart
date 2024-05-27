import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, Product } from '../../../types';
import fetcher from '../../../lib/axios';
import { cartItemQueryOptions } from '../-queryOptions';
import { useCartStore } from '../../../store/cart';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const resetSelectedItems = () =>
    useCartStore.setState(() => ({
      selectedItems: new Set(),
      isAllSelected: false,
    }));

  return useMutation<Order, Error, Product[]>({
    mutationFn: async (order) => {
      const { data } = await fetcher.post('/orders', order);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries(cartItemQueryOptions());
      resetSelectedItems();
    },
  });
};
