import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamService } from '../services/teamService';

export default class TeamController {
  constructor(private teamService: ITeamService) { }
  list = async (_req: Request, res: Response) => {
    const teams = await this.teamService.list();
    return res.status(StatusCodes.OK).json(teams);
  };
}
