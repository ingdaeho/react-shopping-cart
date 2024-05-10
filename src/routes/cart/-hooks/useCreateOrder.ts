import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, Product } from '../../../types';
import fetcher from '../../../lib/axios';
import { cartItemQueryOptions } from '../-queryOptions';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, Product[]>({
    mutationFn: async (order) => {
      const { data } = await fetcher.post('/orders', order);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries(cartItemQueryOptions()),
  });
};
