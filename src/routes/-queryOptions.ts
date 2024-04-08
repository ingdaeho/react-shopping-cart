import { queryOptions } from '@tanstack/react-query';
import fetcher from '../lib/axios';

export const cartItemQuantityQueryOptions = () =>
  queryOptions({
    queryKey: ['cartItemQuantity'],
    queryFn: async () => {
      const { data } = await fetcher.get<number>('/carts');
      return data;
    },
  });
