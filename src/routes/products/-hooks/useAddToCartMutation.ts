import { useQueryClient, useMutation } from '@tanstack/react-query';
import fetcher from '../../../lib/axios';
import { Product } from '../../../types';
import { cartItemQueryOptions } from '../../cart/-queryOptions';

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      const { data } = await fetcher.post('/carts', { product });
      return data;
    },
    onMutate: async (product) => {
      await queryClient.cancelQueries(cartItemQueryOptions());
      const previousCartItemCount = queryClient.getQueryData(
        cartItemQueryOptions().queryKey
      );

      if (previousCartItemCount) {
        queryClient.setQueryData(cartItemQueryOptions().queryKey, [
          ...previousCartItemCount,
          { id: Math.random(), product },
        ]);
      }

      return { previousCartItemCount };
    },
    onError: (_, __, context) => {
      if (context?.previousCartItemCount) {
        queryClient.setQueryData(
          cartItemQueryOptions().queryKey,
          context.previousCartItemCount
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(cartItemQueryOptions());
    },
  });
};
