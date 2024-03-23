import { delay, http, HttpResponse } from 'msw';
import { Product } from '../../routes/products/-queryOptions';

export const handlers = [
  http.all('*', async () => {
    await delay(1000);
  }),
  http.get(__API_URL__ + '/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '냉면용기(대)',
        price: 83700,
        imageUrl: './assets/images/product.png',
      },
      {
        id: 2,
        name: '생새우살 (71/90) 500g 4개',
        price: 29000,
        imageUrl: './assets/images/product.png',
      },
      {
        id: 3,
        name: '펩시 콜라 355ml 24캔',
        price: 83700,
        imageUrl: './assets/images/product.png',
      },
    ]);
  }),

  http.get(__API_URL__ + '/products/1', () => {
    return HttpResponse.json({
      id: 1,
      name: '냉면용기(대)',
      price: 83700,
      imageUrl: './assets/images/product.png',
    });
  }),

  http.post<object, Product>(__API_URL__ + '/products', async ({ request }) => {
    const body = await request.json();
    const { price, name, imageUrl } = body;

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
];
