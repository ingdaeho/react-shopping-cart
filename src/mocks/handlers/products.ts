import { delay, http, HttpResponse } from 'msw';
import { Product } from '../../routes/products/-queryOptions';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '냉면용기(대)',
        price: 83700,
        imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
      },
      {
        id: 2,
        name: '생새우살 (71/90) 500g 4개',
        price: 29000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
      },
      {
        id: 3,
        name: '펩시 콜라 355ml 24캔',
        price: 83700,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/84fc0238-0239-4d0e-870b-a9daa6f2c42c.jpg',
      },
    ]);
  }),

  http.get('/products/1', () => {
    return HttpResponse.json({
      id: 1,
      name: '냉면용기(대)',
      price: 83700,
      imageUrl: './assets/images/product.png',
    });
  }),

  http.post<object, Product>('/products', async ({ request }) => {
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
