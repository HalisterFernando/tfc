import * as bcrypt from 'bcryptjs';

const passwordService = {
  encrypt: (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
};

export default passwordService;
