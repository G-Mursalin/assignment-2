import { Schema, model } from 'mongoose';
import { TOrders, TOrder, OrderModelWithStaticMethod } from './order.interface';

const order = new Schema<TOrder>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Price must be greater than zero',
    },
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Quantity must be greater than zero',
    },
  },
});

const orderSchema = new Schema<TOrders, OrderModelWithStaticMethod>({
  userId: {
    type: Number,
    ref: 'User',
  },
  orders: [order],
});

// Static method for Order Model
orderSchema.statics.isThisUserOrderExists = async function (id: number) {
  return await OrderModel.findOne({ userId: id });
};

// User Model
const OrderModel = model<TOrders, OrderModelWithStaticMethod>(
  'Order',
  orderSchema,
);

export default OrderModel;
