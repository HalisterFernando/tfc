import { NextFunction, Request, Response } from 'express';
import JwtService from '../services/jwtService';

const NewMatch = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  if (token) {
    JwtService.verify(token);
  } else {
    const err = new Error('Token must be a valid token');
    err.name = 'TokenError';
  }

  if (homeTeam === awayTeam) {
    const err = new Error('It is not possible to create a match with two equal teams');
    err.name = 'EqualTeams';
    throw err;
  }

  return next();
};

export default NewMatch;
