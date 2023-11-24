import { TOrders } from './order.interface';
import OrderModel from './order.model';

// Services for add orders
const addOrders = async (orders: TOrders): Promise<TOrders> => {
  return await OrderModel.create(orders);
};

// Services for get all orders
const retrieveAllOrders = async (id: number) => {
  return await OrderModel.findOne({ userId: id }).select({
    _id: 0,
    'orders._id': 0,
    __v: 0,
  });
};

// Services for calculate total price
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
