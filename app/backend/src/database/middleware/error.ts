import type{ ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'EmptyFields':
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    case 'InvalidFields':
      return res.status(StatusCodes.UNAUTHORIZED).json({ message });
    case 'EqualTeams':
      return res.status(StatusCodes.UNAUTHORIZED).json({ message });
    case 'JsonWebTokenError':
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export default errorMiddleware;
