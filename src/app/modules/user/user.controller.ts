import { Request, Response } from 'express';
import UserSchema from './user.validation';
import { userServices } from './user.service';

const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Validation data with Zod
    const validateData = UserSchema.parse(user);

    const result = await userServices.createNewUser(validateData);
    result.password = undefined;

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};
const retrieveAllUsers = async (req: Request, res: Response) => {
  try {
    const results = await userServices.retrieveAllUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const retrieveSpecificUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check is user exists if not then send response
    // res.status(500).json({
    //     success: false,
    //     message: 'User not found',
    //     error: {
    //       code: 404,
    //       description: 'User not found!',
    //     },
    //   });

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: { userId },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedDoc = req.body;

    // Check is user exists if not then send response
    // res.status(500).json({
    //     success: false,
    //     message: 'User not found',
    //     error: {
    //       code: 404,
    //       description: 'User not found!',
    //     },
    //   });

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: { userId, updatedDoc },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check is user exists if not then send response
    // res.status(500).json({
    //     success: false,
    //     message: 'User not found',
    //     error: {
    //       code: 404,
    //       description: 'User not found!',
    //     },
    //   });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

export const userControllers = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
