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
    const checkIfTeamExists = await this.matchService.verifyTeams(req.body);

    if (checkIfTeamExists) {
      const newMatch = await this.matchService.create(req.body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    }
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'There is no team with such id!' });
  };

  updateToFinish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.matchService.updateToFinish(Number(id));
    return res.status(StatusCodes.OK).json(update);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.update(Number(id), req.body);
    return res.status(StatusCodes.OK).json({ ...req.body });
  };
}
