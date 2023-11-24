/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserSchema from './user.validation';
import { userServices } from './user.service';
import UserModel from './user.model';

// Create user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Validation data with Zod
    const validateData = UserSchema.parse(user);

    // Save the validate user data to database and fetch fresh that user data
    const result = await userServices.createNewUser(validateData);
    const userData = await userServices.retrieveSpecificUserByID(result.userId);

    // Send response
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: userData,
    });
  } catch (error: any) {
    // Handle Zod error messages
    if (error.name === 'ZodError') {
      res.status(400).json({
        status: 'fail',
        message: error.issues
          .map((error: any) => `${error.path.join('.')}: ${error.message}`)
          .join(', '),
      });
    }
    // Handle Mongoose error messages
    else if (error.code === 11000) {
      const { keyValue } = error;
      res.status(400).json({
        status: 'fail',
        message: `${Object.keys(keyValue)[0]}: ${
          keyValue[Object.keys(keyValue)[0]]
        } is already exist in database. Please provide a unique value`,
      });
    }
    // Handle other error messages
    else {
      res.status(400).json({
        status: 'fail',
        message: error || 'Something went wrong',
      });
    }
  }
};

// Get all users
const retrieveAllUsers = async (req: Request, res: Response) => {
  try {
    const results = await userServices.retrieveAllUsers();

    // Send response
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: results,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// Get a single user
const retrieveSpecificUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check is user exists if not then send response
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

    const result = await userServices.retrieveSpecificUserByID(Number(userId));

    // Send response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    // Handle Mongoose error messages
    if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    } else {
      // Handle other error messages
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

// Update user information
const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedDoc = req.body;

    // Check is user exists if not then send response
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

    const result = await userServices.updateUserInformation(
      Number(userId),
      updatedDoc,
    );

    // Send response
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is user exists if not then send response
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

    await userServices.deleteAUser(Number(userId));

    // Send response
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    // Handle Mongoose error messages
    if (error.name === 'CastError') {
      res.status(400).json({
        status: 'fail',
        message: `Please provide a valid ${error.path}`,
      });
    } else {
      // Handle other error messages
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
};

export const userControllers = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
