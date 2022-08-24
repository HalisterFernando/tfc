import mySequelize from '../config/sequelize';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import ITable from '../interfaces/ITable';

export interface ILeaderBoardService {
  list(): Promise<ILeaderBoard[]>
}

export default class LeaderBoardService {
  private getOnGoingMatches = async (): Promise<ITable[]> => {
    const query = `
    SELECT 
    ht.team_name as homeTeam, m.home_team_goals as homeTeamGoals, 
    at.team_name as awayTeam, m.away_team_goals as awayTeamGoals, 
    m.in_progress as inProgress
    FROM TRYBE_FUTEBOL_CLUBE.teams as ht
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as at
    INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as m
    ON m.home_team = ht.id AND m.away_team = at.id
    WHERE m.in_progress = 0;`;
    const [matches] = await mySequelize.query(query);
    return matches as ITable[];
  };

  private totalPoints = (obj: ITable[], el: ITable) => {
    const totalPoints = (obj.filter((team) =>
      team.homeTeam === el.homeTeam
          && team.homeTeamGoals > team.awayTeamGoals).length * 3) + obj.filter((team) =>
      team.homeTeam === el.homeTeam
          && team.homeTeamGoals === team.awayTeamGoals).length;
    return totalPoints;
  };

  private totalGames = (obj: ITable[], el: ITable) => {
    const totalGames = obj.filter((team) => team.homeTeam === el.homeTeam).length;
    return totalGames;
  };

  private totalVictories = (obj: ITable[], el: ITable) => {
    const totalVictories = obj.filter((team) =>
      team.homeTeam === el.homeTeam && team.homeTeamGoals > team.awayTeamGoals).length;
    return totalVictories;
  };

  private totalDraws = (obj: ITable[], el: ITable) => {
    const totalDraws = obj.filter((team) =>
      team.homeTeam === el.homeTeam && team.homeTeamGoals === team.awayTeamGoals).length;
    return totalDraws;
  };

  private totalLosses = (obj: ITable[], el: ITable) => {
    const totalLosses = obj.filter((team) =>
      team.homeTeam === el.homeTeam && team.homeTeamGoals < team.awayTeamGoals).length;
    return totalLosses;
  };

  private goalsFavor = (obj: ITable[], el: ITable) => {
    const goalsFavor = obj.filter((team) =>
      team.homeTeam === el.homeTeam).reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return goalsFavor;
  };

  private goalsOwn = (obj: ITable[], el: ITable) => {
    const goalsOwn = obj.filter((team) =>
      team.homeTeam === el.homeTeam).reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    return goalsOwn;
  };

  private leaderBoard = async () => {
    const match = await this.getOnGoingMatches();
    const board = match.map((el) => ({
      name: el.homeTeam,
      totalPoints: this.totalPoints(match, el),
      totalGames: this.totalGames(match, el),
      totalVictories: this.totalVictories(match, el),
      totalDraws: this.totalDraws(match, el),
      totalLosses: this.totalLosses(match, el),
      goalsFavor: this.goalsFavor(match, el),
      goalsOwn: this.goalsOwn(match, el),
      goalsBalance: this.goalsFavor(match, el) - this.goalsOwn(match, el),
      efficiency: ((this.totalPoints(match, el)
      / (this.totalGames(match, el) * 3)) * 100).toFixed(2),
    }));

    return board;
  };

  async list():Promise<ILeaderBoard[]> {
    const matches = await this.leaderBoard();
    const uniqueValuesSet = new Set();
    const board = matches.filter((el) => {
      const isPresentInSet = uniqueValuesSet.has(el.name);
      uniqueValuesSet.add(el.name);
      return !isPresentInSet;
    });

    return board;
  }
}
