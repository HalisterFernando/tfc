import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

export default class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,

  },

}, {
  sequelize: db,
  underscored: true,
  modelName: 'team',
  timestamps: false,
});
