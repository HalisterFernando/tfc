import jwt = require('jsonwebtoken');
import 'dotenv/config';

export default class JwtService {
  static sign(payload: { email: string }):string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }
}
