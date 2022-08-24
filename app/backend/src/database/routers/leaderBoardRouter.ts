import { Router } from 'express';

import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const router = Router();
router.get('/home', leaderBoardController.list);

export default router;
