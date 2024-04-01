import { http, delay, HttpResponse } from 'msw';
import { Product } from '../../routes/products/-queryOptions';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/carts', () => {
    return HttpResponse.json([
      {
        id: 1675351764224,
        product: {
          id: 4,
          name: '리치스 스위트콘 대 2.95kg',
          price: 4780,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
        },
      },
      {
        id: 1675351772608,
        product: {
          id: 4,
          name: '리치스 스위트콘 대 2.95kg',
          price: 4780,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
        },
      },
      {
        id: 1675351774776,
        product: {
          id: 4,
          name: '리치스 스위트콘 대 2.95kg',
          price: 4780,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
        },
      },
      {
        id: 1675351775632,
        product: {
          id: 4,
          name: '리치스 스위트콘 대 2.95kg',
          price: 4780,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
        },
      },
      {
        id: 1675351776006,
        product: {
          id: 4,
          name: '리치스 스위트콘 대 2.95kg',
          price: 4780,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
        },
      },
      {
        id: 1675351781321,
        product: {
          id: 3,
          name: '펩시 콜라 355ml 24캔',
          price: 83700,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/84fc0238-0239-4d0e-870b-a9daa6f2c42c.jpg',
        },
      },
      {
        id: 1675351804540,
        product: {
          id: 12,
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        },
      },
    ]);
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
