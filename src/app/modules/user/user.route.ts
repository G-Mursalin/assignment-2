import express from 'express';
import { userControllers } from './user.controller';
import { orderControllers } from '../order/order.controller';
import { isUserExists } from '../../middlewares/isUserExists';

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
  .post('/', userControllers.createNewUser)
  .get('/', userControllers.retrieveAllUsers)
  .put('/:userId', isUserExists, userControllers.updateUserInformation)
  .get('/:userId', isUserExists, userControllers.retrieveSpecificUserByID)
  .delete('/:userId', isUserExists, userControllers.deleteAUser);

export const userRoutes = router;
