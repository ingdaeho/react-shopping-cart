import { queryOptions, useMutation } from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { Product } from '../products/-queryOptions';
import { queryClient } from '../../main';

export interface Cart {
  id: number;
  product: Product;
}

export const cartItemQueryOptions = () =>
  queryOptions({
    queryKey: ['carts'],
    queryFn: async () => {
      const { data } = await fetcher.get<Cart[]>('/carts');
      return data;
    },
  });

export const useDeleteCartItemMutation = () => {
  return useMutation<unknown, Error, number>({
    mutationFn: async (id) => await fetcher.delete(`/carts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
