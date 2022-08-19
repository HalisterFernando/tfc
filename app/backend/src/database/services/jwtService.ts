import jwt = require('jsonwebtoken');
import 'dotenv/config';

export default class JwtService {
  static sign(payload: { email: string }):string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
  }
}
