import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';
import fetcher from '../../lib/axios';
import { cartItemQueryOptions } from '../cart/-queryOptions';
import { Product, productSchema } from '../../types';

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await fetcher.get<Product[]>('/products');

      return z.array(productSchema).parse(data);
    },
  });

export const productQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: ['products', productId],
    queryFn: async () => {
      const { data } = await fetcher.get<Product>(`/products/${productId}`);
      return data;
    },
  });

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
