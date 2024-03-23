import { queryOptions } from '@tanstack/react-query';
import fetcher from '../../lib/axios';
import { Product } from '../products/-queryOptions';

interface OrderDetails extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  orderDetails: OrderDetails[];
}

const fetchOrderList = async () => {
  const { data } = await fetcher.get<Order[]>('/orders');

  return data;
};

export const orderListQueryOptions = () =>
  queryOptions({
    queryKey: ['orders'],
    queryFn: fetchOrderList,
  });

const fetchOrder = async (orderId: string) => {
  const { data } = await fetcher.get<Order>(`/orders/${orderId}`);

  return data;
};

export const orderQueryOptions = (orderId: string) =>
  queryOptions({
    queryKey: ['orders', orderId],
    queryFn: () => fetchOrder(orderId),
  });
