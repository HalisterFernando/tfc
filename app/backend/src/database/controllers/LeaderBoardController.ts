import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderBoardService } from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: ILeaderBoardService) { }

  list = async (_req: Request, res: Response): Promise<unknown> => {
    const matches = await this.leaderBoardService.list();

    const board = matches.sort((a, b): number => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 1;
    });
    return res.status(StatusCodes.OK).json(board);
  };
}
