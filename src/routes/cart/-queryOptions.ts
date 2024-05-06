import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';
import fetcher from '../../lib/axios';
import { Cart, cartSchema } from '../../types';

export const cartItemQueryOptions = () =>
  queryOptions({
    queryKey: ['carts'],
    queryFn: async () => {
      const { data } = await fetcher.get<Cart[]>('/carts');
      return z.array(cartSchema).parse(data);
    },
    initialData: [],
  });

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number, { previousCartItems?: Cart[] }>({
    mutationFn: async (id) => await fetcher.delete(`/carts/${id}`),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries(cartItemQueryOptions());
      const previousCartItems = queryClient.getQueryData(
        cartItemQueryOptions().queryKey
      );

      if (previousCartItems && previousCartItems.length > 0) {
        queryClient.setQueryData(cartItemQueryOptions().queryKey, [
          ...previousCartItems.filter(({ id }) => id !== cartItemId),
        ]);
      }

      return { previousCartItems };
    },
    onError: (_, __, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          cartItemQueryOptions().queryKey,
          context.previousCartItems
        );
      }
    },
    onSettled: () => queryClient.invalidateQueries(cartItemQueryOptions()),
  });
};
