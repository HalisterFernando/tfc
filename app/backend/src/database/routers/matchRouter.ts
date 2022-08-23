import { Router } from 'express';

import MatchController from '../controllers/MatchController';
import NewMatch from '../middleware/newMatchValidate';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const router = Router();

router.get('/', matchController.list);
router.post('/', NewMatch, matchController.create);
router.patch('/:id/finish', matchController.update);

export default router;
