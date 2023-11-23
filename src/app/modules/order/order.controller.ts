/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderSchema from './order.validation';
import { orderServices } from './order.service';
import OrderModel from './order.model';

const addOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    //Check if the 'orders' property already exists for this user, append a new product to it orders
    const existsOrder = await OrderModel.isThisUserOrderExists(userId);
    if (existsOrder && existsOrder.orders.length >= 1) {
      const result = await OrderModel.updateOne(
        { userId: userId },
        { $addToSet: { orders: order } },
      );
    } else {
      // Validation data with Zod
      const validateData = OrderSchema.parse({
        userId: userId,
        orders: [order],
      });

      const result = await orderServices.addOrders(validateData);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(500).json({
        status: 'fail',
        message: error.issues
          .map((error: any) => `${error.path.join('.')}: ${error.message}`)
          .join(', '),
      });
    } else {
      res.status(500).json({
        status: 'faildfdfdfdf',
        message: error || 'Something went wrong',
      });
    }
  }
};

export const orderControllers = {
  addOrders,
};
