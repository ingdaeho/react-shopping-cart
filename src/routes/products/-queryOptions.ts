import { queryOptions, useMutation } from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { queryClient } from '../../main';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
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
  return useMutation({
    mutationFn: async (product: Product) => {
      const { data } = await fetcher.post('/carts', { product });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['carts'],
        refetchType: 'all',
      }),
  });
};
