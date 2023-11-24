import { z } from 'zod';

const UserSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .trim()
    .refine((val) => val.trim().length >= 3, {
      message: 'User name should be minimum 3 character long',
    }),
  password: z.string(),
  fullName: z.object({
    firstName: z
      .string()
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please provide a valid first name',
      }),
    lastName: z
      .string()
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please provide a valid last name',
      }),
  }),
  age: z
    .number()
    .positive({ message: 'Age can not be negative number or zero' }),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean().optional().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z
      .string()
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please tell us your valid street name',
      }),
    city: z
      .string()
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please tell us your valid city name',
      }),
    country: z
      .string()
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please tell us your valid country name',
      }),
  }),
});

export default UserSchema;
