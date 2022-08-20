import ITeam from '../interfaces/ITeam';
import Team from '../models/team';

export interface ITeamService {
  list(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam | null>
}

export default class TeamService implements ITeamService {
  private getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  private getTeamById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    return team;
  };

  async list(): Promise<ITeam[]> {
    const teams = await this.getAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this.getTeamById(id);
    return team;
  }
}
