/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderSchema, { Order } from './order.validation';
import { orderServices } from './order.service';
import OrderModel from './order.model';
import catchAsync from '../../utils/catchAsync';

// Add orders
const addOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const order = req.body;

  //Check if the 'orders' property already exists for this user, append a new product to it orders
  const existsOrder = await OrderModel.isThisUserOrderExists(Number(userId));
  if (existsOrder && existsOrder.orders.length >= 1) {
    // Validation data with Zod
    const validateData = Order.parse(order);
    await OrderModel.updateOne(
      { userId: userId },
      { $addToSet: { orders: validateData } },
    );
  } else {
    // Validation data with Zod
    const validateData = OrderSchema.parse({
      userId: Number(userId),
      orders: [order],
    });

    await orderServices.addOrders(validateData);
  }

  // Send response
  res.status(201).json({
    success: true,
    message: 'Order created successfully!',
    data: null,
  });
});

// Get all orders for single user
const retrieveAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await orderServices.retrieveAllOrders(Number(userId));

  // Send Response
  res.status(200).json({
    success: true,
    message: 'Order fetched successfully!',
    data: { orders: result?.orders },
  });
});

// Calculate total price for single user
const calculateTotalPriceOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await orderServices.calculateTotalPriceOrder(Number(userId));

    // Send response
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result.length != 0 ? result[0].totalPrice : 0,
      },
    });
  },
);

export const orderControllers = {
  addOrders,
  retrieveAllOrders,
  calculateTotalPriceOrder,
};
