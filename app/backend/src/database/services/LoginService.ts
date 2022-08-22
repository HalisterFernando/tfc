import { JwtPayload } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import User from '../models/user';
import JwtService from './jwtService';

export type ILogin = {
  email: string
  password: string
};

export interface ILoginService {
  login(data: ILogin): Promise<IUser>
  validate(token: string): Promise<IUser>
}

export default class LoginService implements ILoginService {
  private getUserByEmail = async (data: ILogin): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email: data.email } });
    return user;
  };

  private verifyToken = async (token: string): Promise<string | JwtPayload> => {
    const decoded = JwtService.verify(token);

    return decoded;
  };

  async login(data: ILogin): Promise<IUser> {
    const user = await this.getUserByEmail(data);

    if (!user || user.email !== data.email) {
      const err = new Error('Incorrect email or password');
      err.name = 'InvalidFields';
      throw err;
    }
    return user as IUser;
  }

  async validate(token: string): Promise<IUser> {
    const { email } = await this.verifyToken(token) as JwtPayload;

    const user = await User.findOne({
      where: { email }, attributes: ['token'],
    });
    return user as IUser;
  }
}
