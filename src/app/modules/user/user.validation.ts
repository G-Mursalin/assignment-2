import { z } from 'zod';

const UserSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  }),
  age: z.number(),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean().optional().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().trim(),
    city: z.string().trim(),
    country: z.string().trim(),
  }),
});

export default UserSchema;
