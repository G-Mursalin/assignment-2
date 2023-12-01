/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

// Create user
const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  // Save the validate user data to database and fetch fresh that user data
  const result = await userServices.createNewUser(user);
  const userData = await userServices.retrieveSpecificUserByID(result.userId);

  // Send response
  res.status(201).json({
    success: true,
    message: 'User created successfully!',
    data: userData,
  });
});

// Get all users
const retrieveAllUsers = catchAsync(async (req: Request, res: Response) => {
  const results = await userServices.retrieveAllUsers();

  // Send response
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully!',
    data: results,
  });
});

// Get a single user
const retrieveSpecificUserByID = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await userServices.retrieveSpecificUserByID(Number(userId));

    // Send response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  },
);

// Update user information
const updateUserInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updatedDoc = req.body;

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
  },
);

// Delete a user
const deleteAUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userServices.deleteAUser(Number(userId));

  // Send response
  res.status(200).json({
    success: true,
    message: 'User deleted successfully!',
    data: null,
  });
});

export const userControllers = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
