import { queryOptions, useMutation } from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { queryClient } from '../../main';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const fetchProductList = async () => {
  const { data } = await fetcher.get<Product[]>('/products');

  return data;
};

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: fetchProductList,
  });

const fetchProduct = async (productId: string) => {
  const { data } = await fetcher.get<Product>(`/products/${productId}`);

  return data;
};

export const productQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', productId],
    queryFn: () => fetchProduct(productId),
  });

export const postProduct = async (product: Product) => {
  const { data } = await fetcher.post('/products', product);

  return data;
};

export const useAddToCartMutation = (product: Product) => {
  return useMutation({
    mutationKey: ['products', product.id],
    mutationFn: postProduct,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
