import { useMutation } from '@tanstack/react-query';
import { Order, Product } from '../../../types';
import fetcher from '../../../lib/axios';

export const useCreateOrder = () => {
  return useMutation<Order, Error, Product[]>({
    mutationFn: async (order) => {
      const { data } = await fetcher.post('/orders', order);
      return data;
    },
  });
};
