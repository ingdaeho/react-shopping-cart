import { setupWorker } from 'msw/browser';
import { handlers as products } from './handlers/products';

export const worker = setupWorker(...products);
