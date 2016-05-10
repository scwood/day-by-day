import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authorize from '../middleware/authorize';
import checkForParams from '../middleware/checkForParams';

const controller = new UsersController();
const router = new Router();

router.route('/')
  .post(checkForParams(['token']), controller.createUser);
router.route('/me')
  .get(authorize, controller.getMe)
  .patch(authorize, controller.updateMe);

export default router;
