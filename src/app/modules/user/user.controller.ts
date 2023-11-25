/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserSchema from './user.validation';
import { userServices } from './user.service';
import UserModel from './user.model';

// Send Error Response
const errorResponse = (
  res: Response,
  statusCode: number,
  errorMessage: string,
) => {
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: {
      code: statusCode,
      description: errorMessage,
    },
  });
};

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
      const errorMessage = error.issues
        .map((error: any) => `${error.path.join('.')}: ${error.message}`)
        .join(', ');

      errorResponse(res, 400, errorMessage);
    }
    // Handle Mongoose error messages
    else if (error.code === 11000) {
      const { keyValue } = error;
      const errorMessage = `${Object.keys(keyValue)[0]}: ${
        keyValue[Object.keys(keyValue)[0]]
      } is already exist in database. Please provide a unique value`;
      errorResponse(res, 400, errorMessage);
    }
    // Handle other error messages
    else {
      errorResponse(res, 400, error.message || 'Something Wend Wrong');
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
    errorResponse(res, 400, error.message || 'Something went wrong');
  }
};

// Get a single user
const retrieveSpecificUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check is user exists if not then send response
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return errorResponse(res, 404, 'User not found');
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
      const errorMessage = `Please provide a valid ${error.path}`;
      errorResponse(res, 400, errorMessage);
    }
    // Handle other error messages
    else {
      errorResponse(res, 400, error.message || 'Something went wrong');
    }
  }
};

// Update user information
const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedDoc = req.body;

    // Validation data with Zod
    const pickFields = Object.keys(updatedDoc)
      .filter((key) => typeof key === 'string')
      .reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as { [key: string]: true },
      );

    const validateData = UserSchema.pick(pickFields).parse(updatedDoc);

    // Check is user exists if not then send response
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return errorResponse(res, 404, 'User not found');
    }

    const result = await userServices.updateUserInformation(
      Number(userId),
      validateData,
    );

    // Send response
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    // Handle Zod error messages
    if (error.name === 'ZodError') {
      const errorMessage = error.issues
        .map((error: any) => `${error.path.join('.')}: ${error.message}`)
        .join(', ');

      errorResponse(res, 400, errorMessage);
    }
    // Handle Mongoose errors
    else if (error.name === 'CastError') {
      const errorMessage = `Please provide a valid ${error.path}`;
      errorResponse(res, 400, errorMessage);
    }
    // Handle other errors
    else {
      errorResponse(res, 400, error.message || 'Something went wrong');
    }
  }
};

// Delete a user
const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is user exists if not then send response
    if (!(await UserModel.isUserExists(Number(userId)))) {
      return errorResponse(res, 404, 'User not found');
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
      const errorMessage = `Please provide a valid ${error.path}`;
      errorResponse(res, 400, errorMessage);
    }
    // Handle other error messages
    else {
      errorResponse(res, 400, error.message || 'Something went wrong');
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
