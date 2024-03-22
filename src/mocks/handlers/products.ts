import { http, HttpResponse } from 'msw';

export const handlers = [
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
];
