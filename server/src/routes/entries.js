import { Router } from 'express';

import EntriesController from '../controllers/EntriesController';
import authenticate from '../middleware/authenticate';
import checkForParams from '../middleware/checkForParams';

const controller = new EntriesController();
const router = new Router();

router.route('/')
  .get(authenticate, controller.getEntries)
  .post(authenticate, checkForParams(['date', 'text']), controller.postEntry);
router.route('/:id')
  .get(authenticate, controller.getEntry)
  .patch(authenticate, controller.patchEntry);

export default router;
