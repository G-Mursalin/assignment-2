/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderSchema from './order.validation';
import { orderServices } from './order.service';
import OrderModel from './order.model';
import UserModel from '../user/user.model';

const addOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    // Check is this user exist in our user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    //Check if the 'orders' property already exists for this user, append a new product to it orders
    const existsOrder = await OrderModel.isThisUserOrderExists(Number(userId));
    if (existsOrder && existsOrder.orders.length >= 1) {
      const result = await OrderModel.updateOne(
        { userId: userId },
        { $addToSet: { orders: order } },
      );
    } else {
      // Validation data with Zod
      const validateData = OrderSchema.parse({
        userId: Number(userId),
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

const retrieveAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is this user exist in our user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await orderServices.retrieveAllOrders(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result?.orders },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const calculateTotalPriceOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is this user exist in user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await orderServices.calculateTotalPriceOrder(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result.length != 0 ? result[0].totalPrice : 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error || 'Something went wrong',
    });
  }
};

export const orderControllers = {
  addOrders,
  retrieveAllOrders,
  calculateTotalPriceOrder,
};
