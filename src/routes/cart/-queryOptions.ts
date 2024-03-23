import { queryOptions } from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { Product } from '../products/-queryOptions';

interface Cart extends Product {
  id: number;
  product: Product;
}

const fetchCartItems = async () => {
  const { data } = await fetcher.get<Cart[]>('/carts');

  return data;
};

export const cartItemQueryOptions = () =>
  queryOptions({
    queryKey: ['carts'],
    queryFn: fetchCartItems,
  });
