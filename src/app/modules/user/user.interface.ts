import { z } from 'zod';
import { userValidators } from './user.validation';
import { Model } from 'mongoose';

export type TUser = z.infer<typeof userValidators.createUserValidationSchema>;

export interface UserModelWithStaticMethod extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
}
