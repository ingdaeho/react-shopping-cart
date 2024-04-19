import { queryOptions, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import fetcher from '../../lib/axios';
import { Product, productSchema } from '../products/-queryOptions';
import { queryClient } from '../../main';

export interface Cart {
  id: number;
  product: Product;
}

export const cartSchema = z.object({
  id: z.number(),
  product: productSchema,
});

export const cartItemQueryOptions = () =>
  queryOptions({
    queryKey: ['carts'],
    queryFn: async () => {
      const { data } = await fetcher.get<Cart[]>('/carts');
      return z.array(cartSchema).parse(data);
    },
  });

export const useDeleteCartItemMutation = () => {
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
    onError: (err, variables, context) => {
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
