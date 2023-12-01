/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';

// Add orders
const addOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const order = req.body;

  await orderServices.addOrders(userId, order);
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
