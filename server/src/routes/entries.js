import { Router } from 'express';

import EntriesController from '../controllers/EntriesController';
import authorize from '../middleware/authorize';
import checkForParams from '../middleware/checkForParams';

const controller = new EntriesController();
const router = new Router();

router.route('/')
  .get(authorize, controller.getEntries)
  .post(authorize, checkForParams(['date', 'text']), controller.postEntry);
router.route('/:id')
  .get(authorize, controller.getEntry)
  .patch(authorize, controller.patchEntry)
  .delete(authorize, controller.deleteEntry);

export default router;
