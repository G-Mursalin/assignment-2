import { z } from 'zod';

export const Order = z.object({
  productName: z
    .string()
    .trim()
    .refine((val) => val.trim().length > 0, {
      message: 'Please provide a  valid product name',
    }),
  price: z
    .number()
    .positive({ message: 'Price can not be negative number or zero' }),
  quantity: z.number().refine((val) => val > 0, {
    message: 'Quantity should be minimum 1',
  }),
});

const OrderSchema = z.object({
  userId: z.number(),
  orders: z.array(Order),
});

export default OrderSchema;
