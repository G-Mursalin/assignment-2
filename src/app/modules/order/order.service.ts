import { TOrders } from './order.interface';
import OrderModel from './order.model';

// Services for add orders
const addOrders = async (userId: string, order: TOrders): Promise<TOrders> => {
  //Check if the 'orders' property already exists for this user, append a new product to it orders
  const existsOrder = await OrderModel.isThisUserOrderExists(Number(userId));
  if (existsOrder && existsOrder.orders.length >= 1) {
    return await OrderModel.updateOne(
      { userId: userId },
      { $addToSet: { orders: order } },
    );
  } else {
    const data = {
      userId: Number(userId),
      orders: [order],
    };
    return await OrderModel.create(data);
  }
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
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);
};

export const orderServices = {
  addOrders,
  retrieveAllOrders,
  calculateTotalPriceOrder,
};
