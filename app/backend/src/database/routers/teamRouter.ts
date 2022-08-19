import { Router } from 'express';

import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const router = Router();

router.get('/', teamController.list);

export default router;
