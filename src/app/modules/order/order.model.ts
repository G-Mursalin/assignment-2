import { Schema, model } from 'mongoose';
import { TOrders, TOrder, OrderModelWithStaticMethod } from './order.interface';

const order = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<TOrders, OrderModelWithStaticMethod>({
  userId: {
    type: String,
    ref: 'User',
  },
  orders: [order],
});

orderSchema.statics.isThisUserOrderExists = async function (id: string) {
  return await OrderModel.findOne({ userId: id });
};

// User Model
const OrderModel = model<TOrders, OrderModelWithStaticMethod>(
  'Order',
  orderSchema,
);

export default OrderModel;
