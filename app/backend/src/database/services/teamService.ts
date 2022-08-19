import ITeam from '../interfaces/ITeam';
import Team from '../models/team';

export interface ITeamService {
  list(): Promise<ITeam[]>
}

export default class TeamService implements ITeamService {
  private getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  async list(): Promise<ITeam[]> {
    const teams = await this.getAll();
    return teams;
  }
}
