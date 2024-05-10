import { delay, http, HttpResponse } from 'msw';
import { Product } from '../../types';
import { products } from '../db.json';

export const handlers = [
  http.all('*', async () => await delay()),

  http.get('/products', ({ request }) => {
    const url = new URL(request.url);

    const size = Number(url.searchParams.get('size'));
    const page = Number(url.searchParams.get('page'));
    const totalCount = products.length;
    const totalPages = Math.round(totalCount / size);

    return HttpResponse.json({
      items: products.slice(page * size, (page + 1) * size),
      pageNumber: page,
      pageSize: size,
      totalPages,
      totalCount,
      isLastPage: totalPages <= page,
      isFirstPage: page === 0,
    });
  }),

  http.get('/products/:productId', async ({ params }) => {
    const { productId } = params;

    const product = products.find((product) => {
      return product.id === Number(productId);
    });

    if (!product) return new HttpResponse('Product not found', { status: 404 });

    return HttpResponse.json(product);
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
