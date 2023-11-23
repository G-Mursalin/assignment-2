import { TOrders } from './order.interface';
import OrderModel from './order.model';

const addOrders = async (orders: TOrders): Promise<TOrders> => {
  return await OrderModel.create(orders);
};

const retrieveAllOrders = async (id: number): Promise<TOrders | null> => {
  return await OrderModel.findOne({ userId: id });
};

const calculateTotalPriceOrder = async (id: number) => {
  return await OrderModel.aggregate([
    { $match: { userId: id } },
    { $unwind: { path: '$orders' } },
    { $group: { _id: '$userId', totalPrice: { $sum: '$orders.price' } } },
  ]);
};

export const orderServices = {
  addOrders,
  retrieveAllOrders,
  calculateTotalPriceOrder,
};
