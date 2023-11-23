import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router
  .post('/', userControllers.createNewUser)
  .get('/', userControllers.retrieveAllUsers)
  .patch('/:userId', userControllers.updateUserInformation)
  .get('/:userId', userControllers.retrieveSpecificUserByID)
  .delete('/:userId', userControllers.deleteAUser);

export const userRoutes = router;
