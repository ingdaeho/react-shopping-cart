import { setupWorker } from 'msw/browser';
import { handlers as products } from './handlers/products';
import { handlers as orders } from './handlers/orders';
import { handlers as carts } from './handlers/carts';

export const worker = setupWorker(...products, ...orders, ...carts);
