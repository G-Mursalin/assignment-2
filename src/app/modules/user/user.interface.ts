import { z } from 'zod';
import UserSchema from './user.validation';

export type TUser = z.infer<typeof UserSchema>;
