import { z } from 'zod';

const createOrderValidationSchema = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    })
    .trim()
    .refine((val) => val.trim().length > 0, {
      message: 'Please provide a  valid product name',
    }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price can not be negative number or zero' }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .refine((val) => val > 0, {
      message: 'Quantity should be minimum 1',
    }),
});

export const orderValidations = { createOrderValidationSchema };
