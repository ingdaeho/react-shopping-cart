import { http, delay, HttpResponse } from 'msw';
import { Product } from '../../types';
import { orders } from '../db.json';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/orders', () => {
    return HttpResponse.json(orders);
  }),

  http.post<object, Product[]>('/orders', async ({ request }) => {
    const body = await request.json();
    const products = body;

    for (const product of products) {
      const { quantity, price, name, imageUrl } = product;

      if (
        !Number.isInteger(quantity) ||
        quantity! < 1 ||
        !Number.isInteger(price) ||
        typeof name !== 'string' ||
        typeof imageUrl !== 'string'
      ) {
        return new HttpResponse('error occurred on create order', {
          status: 400,
        });
      }
    }
    return HttpResponse.json({
      id: new Date().getTime(),
      OrderDetail: products,
    });
  }),

  http.get('/orders/:orderId', ({ params }) => {
    const { orderId } = params;

    const order = orders.find((order) => {
      return order.id === Number(orderId);
    });

    if (!order) return new HttpResponse('Order not found', { status: 404 });

    return HttpResponse.json(order);
  }),
];
