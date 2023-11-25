import { z } from 'zod';
import OrderSchema, { Order } from './order.validation';
import { Model } from 'mongoose';

export type TOrders = z.infer<typeof OrderSchema>;
export type TOrder = z.infer<typeof Order>;

export interface OrderModelWithStaticMethod extends Model<TOrders> {
  // eslint-disable-next-line no-unused-vars
  isThisUserOrderExists(id: number): Promise<TOrders | null>;
}
