import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './team';

export default class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },

}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam',
  as: 'TeamMatch',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Team, {
  foreignKey: 'awayTeam', as: 'teamAway',
});
