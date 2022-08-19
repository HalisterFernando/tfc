import * as bcrypt from 'bcryptjs';

const passwordService = {
  compareSync: (password: string, hash: string) => bcrypt.compareSync(password, hash),
};

export default passwordService;
