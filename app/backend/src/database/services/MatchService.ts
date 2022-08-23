import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import Match from '../models/match';
import Team from '../models/team';

export type TypeMatch = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,

};

export type UpdateMatch = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export interface IMatchService {
  list(): Promise<IMatch[]>
  onGoingMatches(inProgress: boolean): Promise<IMatch[]>
  create(data: TypeMatch): Promise<IMatch>
  updateToFinish(id: number): Promise<unknown>
  verifyTeams(data: TypeMatch): Promise<boolean>
  update(id: number, data: UpdateMatch): Promise<void>
}

export default class MatchService implements IMatchService {
  private getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],

      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],

    });
    return matches;
  };

  private getOnGoinMatches = async (inProgress: boolean): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],

      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
      where: { inProgress },
    });
    return matches;
  };

  private addOnGoingMatch = async (data: TypeMatch): Promise<IMatch> => {
    const newMatch = await Match.create({ ...data, inProgress: true });
    const { id } = JSON.parse(JSON.stringify(newMatch.toJSON()));
    const result = { id, ...data, inProgress: true };
    return result;
  };

  private updateMatchToFinish = async (id: number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  private findTeamById = async (id: number): Promise<ITeam | null> => {
    const team = Team.findByPk(id);
    return team;
  };

  private findMatchById = async (id: number): Promise<IMatch | null > => {
    const match = Match.findByPk(id);
    return match;
  };

  private updateMatch = async (id: number, data: UpdateMatch): Promise<void> => {
    const { homeTeamGoals, awayTeamGoals } = data;
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };

  async list(): Promise<IMatch[]> {
    const matches = this.getAll();
    return matches;
  }

  async onGoingMatches(inProgress: boolean): Promise<IMatch[]> {
    const matches = this.getOnGoinMatches(inProgress);
    return matches;
  }

  async create(data: TypeMatch): Promise<IMatch> {
    const newMatch = this.addOnGoingMatch(data);
    return newMatch;
  }

  async updateToFinish(id: number): Promise<unknown> {
    await this.updateMatchToFinish(id);
    return { message: 'Finished' };
  }

  async verifyTeams(data: TypeMatch): Promise<boolean> {
    const { homeTeam, awayTeam } = data;
    const teams = [homeTeam, awayTeam];
    const checkTeams = await Promise.all(teams.map((team) => this.findTeamById(team)));

    return checkTeams.every((el) => el !== null);
  }

  async update(id: number, data: UpdateMatch): Promise<void> {
    const { inProgress } = await this.findMatchById(id) as IMatch;

    if (inProgress) {
      await this.updateMatch(id, data);
    } else {
      const err = new Error('This match is already finished');
      err.name = 'MatchIsFinished';
      throw err;
    }
  }
}
