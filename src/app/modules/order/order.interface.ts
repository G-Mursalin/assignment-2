import { z } from 'zod';
import { Model } from 'mongoose';
import { orderValidations } from './order.validation';

export type TOrder = z.infer<
  typeof orderValidations.createOrderValidationSchema
>;
export type TOrders = {
  userId: number;
  orders: [TOrder];
};

export interface OrderModelWithStaticMethod extends Model<TOrders> {
  // eslint-disable-next-line no-unused-vars
  isThisUserOrderExists(id: number): Promise<TOrders | null>;
}
