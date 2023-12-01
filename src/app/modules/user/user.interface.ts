import { z } from 'zod';
import { studentValidators } from './user.validation';
import { Model } from 'mongoose';

export type TUser = z.infer<
  typeof studentValidators.createUserValidationSchema
>;

export interface UserModelWithStaticMethod extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
}
