import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import CustomError from '../utils/CustomError';
import UserModel from '../modules/user/user.model';

export const isUserExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!(await UserModel.isUserExists(Number(userId)))) {
      throw new CustomError(404, 'User not found');
    } else {
      next();
    }
  },
);
