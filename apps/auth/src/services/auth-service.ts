import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { BCRYPT_SALT, JWT_TOKEN, JWT_EXPIRES_IN } from '../config/environment'
import { ROLES } from '../entities/types/roles'

interface tokenInfo {
  userId: string,
  role: ROLES
}

interface authToken {
    sub: string
}

export class AuthService {
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordCorret = await bcrypt.compare(password, hashedPassword)

        return isPasswordCorret
    }

    public static generateToken(tokenInfo: tokenInfo): string {
      return jwt.sign({ tokenInfo }, JWT_TOKEN, {
        expiresIn: JWT_EXPIRES_IN
      });
    }
  
    public static decodeToken(token: string): authToken {
      return jwt.verify(token, JWT_TOKEN) as authToken;
    }

}