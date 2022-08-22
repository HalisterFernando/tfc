import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchService } from '../services/MatchService';

export default class TeamController {
  constructor(private matchService: IMatchService) { }
  list = async (_req: Request, res: Response) => {
    const matches = await this.matchService.list();
    return res.status(StatusCodes.OK).json(matches);
  };

//   getById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const team = await this.matchService.getById(Number(id));
//     return res.status(StatusCodes.OK).json(team);
//   };
}
