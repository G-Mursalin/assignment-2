import { z } from 'zod';

export const Order = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const OrderSchema = z.object({
  userId: z.string(),
  orders: z.array(Order),
});

export default OrderSchema;
