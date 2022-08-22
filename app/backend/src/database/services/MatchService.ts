import IMatch from '../interfaces/IMatch';
import Match from '../models/match';
import Team from '../models/team';

export interface IMatchService {
  list(): Promise<IMatch[]>
  onGoingMatches(inProgress: boolean): Promise<IMatch[]>
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

  async list(): Promise<IMatch[]> {
    const matches = this.getAll();
    return matches;
  }

  async onGoingMatches(inProgress: boolean): Promise<IMatch[]> {
    const matches = this.getOnGoinMatches(inProgress);
    return matches;
  }
}
