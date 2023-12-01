import express from 'express';
import { userControllers } from './user.controller';
import { orderControllers } from '../order/order.controller';
import { isUserExists } from '../../middlewares/isUserExists';
import validateRequest from '../../middlewares/validateRequest';
import { userValidators } from './user.validation';

const router = express.Router();

// Order Routes
router.put('/:userId/orders', isUserExists, orderControllers.addOrders);
router.get('/:userId/orders', isUserExists, orderControllers.retrieveAllOrders);
router.get(
  '/:userId/orders/total-price',
  isUserExists,
  orderControllers.calculateTotalPriceOrder,
);

// Users Routes
router
  .post(
    '/',
    validateRequest(userValidators.createUserValidationSchema),
    userControllers.createNewUser,
  )
  .get('/', userControllers.retrieveAllUsers)
  .put(
    '/:userId',
    isUserExists,
    validateRequest(userValidators.updateUserValidationSchema),
    userControllers.updateUserInformation,
  )
  .get('/:userId', isUserExists, userControllers.retrieveSpecificUserByID)
  .delete('/:userId', isUserExists, userControllers.deleteAUser);

export const userRoutes = router;
