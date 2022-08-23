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

  create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam !== awayTeam) {
      const newMatch = await this.matchService.create(req.body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    }
    const err = new Error('It is not possible to create a match with two equal teams');
    err.name = 'EqualTeams';
    throw err;
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.matchService.update(Number(id));
    return res.status(StatusCodes.OK).json(update);
  };
}
