import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authenticate from '../middleware/authenticate';
import checkForParams from '../middleware/checkForParams';

const controller = new UsersController();
const router = new Router();

router.route('/')
  .post(checkForParams(['token']), controller.postUser);
router.route('/me')
  .get(authenticate, controller.getMe)
  .patch(authenticate, controller.patchMe);

export default router;
