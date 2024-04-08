import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { cartItemQueryOptions } from '../cart/-queryOptions';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await fetcher.get<Product[]>('/products');
      return data;
    },
  });

export const productQueryOptions = (productId: string) =>
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
    onError: (err, variables, context) => {
      if (context?.previousCartItemCount) {
        queryClient.setQueryData(
          cartItemQueryOptions().queryKey,
          context.previousCartItemCount
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries(cartItemQueryOptions());
    },
  });
};
