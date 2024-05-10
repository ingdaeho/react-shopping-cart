import { http, delay, HttpResponse } from 'msw';
import { Product } from '../../types';
import { carts } from '../db.json';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/carts', () => {
    return HttpResponse.json(carts);
  }),

  http.post<object, { product: Product }>('/carts', async ({ request }) => {
    const body = await request.json();
    const { price, name, imageUrl } = body.product;

    if (
      !Number.isInteger(price) ||
      typeof name !== 'string' ||
      typeof imageUrl !== 'string'
    ) {
      return new HttpResponse('', { status: 400 });
    } else {
      return new HttpResponse('', { status: 201 });
    }
  }),

  http.delete('/carts/:id', async () => {
    return new HttpResponse('delete success', { status: 200 });
  }),
];
