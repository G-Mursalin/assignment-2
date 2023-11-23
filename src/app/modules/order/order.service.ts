import { TOrders } from './order.interface';
import OrderModel from './order.model';

const addOrders = async (orders: TOrders): Promise<TOrders> => {
  return await OrderModel.create(orders);
};

export const orderServices = {
  addOrders,
};
