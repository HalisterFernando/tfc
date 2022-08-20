import { Router } from 'express';

import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const router = Router();

router.get('/', teamController.list);
router.get('/:id', teamController.getById);

export default router;
