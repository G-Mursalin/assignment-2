import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const appRoutes = [{ path: '/users', route: userRoutes }];

appRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
