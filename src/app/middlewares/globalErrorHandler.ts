/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

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

// Handle all kinds of errors
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  // Handle Mongoose errors
  else if (error.name === 'CastError') {
    const errorMessage = `Please provide a valid ${error.path}`;
    errorResponse(res, 400, errorMessage);
  }
  // Handle other error messages
  else {
    errorResponse(res, 400, error.message || 'Something Wend Wrong');
  }

  next();
};

export default globalErrorHandler;
