import IUser from '../interfaces/IUser';
import User from '../models/user';

import passwordService from './passwordService';

export type ILogin = {
  email: string
  password: string
};

export interface ILoginService {
  login(data: ILogin): Promise<IUser>
}

export default class LoginService implements ILoginService {
  private findByPassword = async (password: string): Promise<IUser | null> => {
    const hash = passwordService.encrypt(password);
    const user = User.findOne({ where: { password: hash } });
    return user;
  };

  async login(data: ILogin): Promise<IUser> {
    const user = await this.findByPassword(data.password);

    if (!user || user.email !== data.email) {
      const err = new Error('Incorrect email or password');
      err.name = 'InvalidFields';
      throw err;
    }
    return user as IUser;
  }
}
