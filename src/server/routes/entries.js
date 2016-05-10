import { Router } from 'express';

import EntriesController from '../controllers/EntriesController';

const controller = new EntriesController();
const router = new Router();

router.route('/')
  .get(controller.getEntries);
router.route('/:entryId')
  .post(controller.postEntry)
  .patch(controller.patchEntry);

export default router;
