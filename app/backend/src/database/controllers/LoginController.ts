import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwtService';
import { ILoginService } from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: ILoginService) {}
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('All fields must be filled');
      err.name = 'EmptyFields';
      throw err;
    }
    const user = await this.loginService.login(req.body);
    const token = JwtService.sign({ email: user.email });
    return res.status(StatusCodes.OK).json({ token });
  };
}
