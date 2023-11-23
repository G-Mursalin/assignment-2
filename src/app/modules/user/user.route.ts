import express from 'express';
import { userControllers } from './user.controller';
import { orderControllers } from '../order/order.controller';

const router = express.Router();

// Order Routes
router.post('/:userId/orders', orderControllers.addOrders);
router.get('/:userId/orders', orderControllers.retrieveAllOrders);
router.get(
  '/:userId/orders/total-price',
  orderControllers.calculateTotalPriceOrder,
);

// Users Routes
router
  .post('/', userControllers.createNewUser)
  .get('/', userControllers.retrieveAllUsers)
  .patch('/:userId', userControllers.updateUserInformation)
  .get('/:userId', userControllers.retrieveSpecificUserByID)
  .delete('/:userId', userControllers.deleteAUser);

export const userRoutes = router;
