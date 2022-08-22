import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchService } from '../services/MatchService';

export default class TeamController {
  constructor(private matchService: IMatchService) { }
  list = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await this.matchService.list();
      return res.status(StatusCodes.OK).json(matches);
    }
    const bool = inProgress === 'true';
    const matches = await this.matchService.onGoingMatches(bool);
    return res.status(StatusCodes.OK).json(matches);
  };
}
