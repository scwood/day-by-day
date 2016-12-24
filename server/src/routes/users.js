import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authorize from '../middleware/authorize';
import checkForParams from '../middleware/checkForParams';

const controller = new UsersController();
const router = new Router();

router.route('/')
  .post(checkForParams(['token']), controller.postUser);
router.route('/me')
  .get(authorize, controller.getMe)
  .patch(authorize, controller.patchMe);

export default router;
