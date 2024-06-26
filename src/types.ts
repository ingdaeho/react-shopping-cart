import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  quantity: z.number().optional(),
});

export const cartSchema = z.object({
  id: z.number(),
  product: productSchema,
});

const orderDetailSchema = productSchema.extend({
  quantity: z.number(),
});

export const orderSchema = z.object({
  id: z.number(),
  orderDetails: z.array(orderDetailSchema),
});

export type Cart = z.infer<typeof cartSchema>;

export type Product = z.infer<typeof productSchema>;

export type Order = z.infer<typeof orderSchema>;
