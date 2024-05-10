import { http, delay, HttpResponse } from 'msw';
import { Order } from '../../types';
import { orders } from '../db.json';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/orders', () => {
    return HttpResponse.json(orders);
  }),

  http.post<object, Order>('/orders', async ({ request }) => {
    const body = await request.json();
    const { orderDetails } = body;

    for (const orderDetail of orderDetails) {
      const { quantity, price, name, imageUrl } = orderDetail;

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !Number.isInteger(price) ||
        typeof name !== 'string' ||
        typeof imageUrl !== 'string'
      ) {
        new HttpResponse('', { status: 400 });
        return;
      }
    }
    new HttpResponse('', { status: 201 });
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
