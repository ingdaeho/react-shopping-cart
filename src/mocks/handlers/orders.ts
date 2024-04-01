import { http, delay, HttpResponse } from 'msw';
import { Order } from '../../routes/order/-queryOptions';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/orders', () => {
    return HttpResponse.json([
      {
        id: 1,
        orderDetails: [
          {
            id: 1,
            name: '[리뉴얼]젓가락(종이)-정성을 담아',
            price: 21800,
            imageUrl:
              'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
            quantity: 5,
          },
          {
            id: 2,
            name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
            price: 21800,
            imageUrl:
              'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
            quantity: 3,
          },
        ],
      },
    ]);
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

  http.get('/orders/:orderId', () => {
    return HttpResponse.json({
      id: 1,
      orderDetails: [
        {
          id: 1,
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
          quantity: 5,
        },
        {
          id: 2,
          name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
          price: 21800,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
          quantity: 3,
        },
      ],
    });
  }),
];
