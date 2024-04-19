import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import fetcher from '../../lib/axios';
import { Product, productSchema } from '../products/-queryOptions';

interface OrderDetails extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  orderDetails: OrderDetails[];
}

const orderDetailSchema = productSchema.extend({
  quantity: z.number(),
});

export const orderSchema = z.object({
  id: z.number(),
  orderDetails: z.array(orderDetailSchema),
});

const fetchOrderList = async () => {
  const { data } = await fetcher.get<Order[]>('/orders');

  return z.array(orderSchema).parse(data);
};

export const orderListQueryOptions = () =>
  queryOptions({
    queryKey: ['orders'],
    queryFn: fetchOrderList,
  });

const fetchOrder = async (orderId: number) => {
  const { data } = await fetcher.get<Order>(`/orders/${orderId}`);

  return orderSchema.parse(data);
};

export const orderQueryOptions = (orderId: number) =>
  queryOptions({
    queryKey: ['orders', orderId],
    queryFn: () => fetchOrder(orderId),
  });
