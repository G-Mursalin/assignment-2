/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderSchema from './order.validation';
import { orderServices } from './order.service';
import OrderModel from './order.model';
import UserModel from '../user/user.model';

// Add orders
const addOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    // Check is this user exist in our user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(400).json({
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
      await OrderModel.updateOne(
        { userId: userId },
        { $addToSet: { orders: order } },
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
  } catch (error: any) {
    // Handle Zod Errors
    if (error.name === 'ZodError') {
      res.status(400).json({
        status: 'fail',
        message: error.issues
          .map((error: any) => `${error.path.join('.')}: ${error.message}`)
          .join(', '),
      });
    }
    // Handle Mongoose error messages
    else if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    }
    // Handle other errors
    else {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

// Get all orders for single user
const retrieveAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is this user exist in our user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await orderServices.retrieveAllOrders(Number(userId));

    // Send Response
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result?.orders },
    });
  } catch (error: any) {
    // Handle mongoose Errors
    if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    }
    // Handle Others errors
    else {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

// Calculate total price for single user
const calculateTotalPriceOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is this user exist in user collection
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await orderServices.calculateTotalPriceOrder(Number(userId));

    // Send response
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result.length != 0 ? result[0].totalPrice : 0,
      },
    });
  } catch (error: any) {
    // Handle Mongoose errors
    if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    }
    // Handle other errors
    else {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

export const orderControllers = {
  addOrders,
  retrieveAllOrders,
  calculateTotalPriceOrder,
};
