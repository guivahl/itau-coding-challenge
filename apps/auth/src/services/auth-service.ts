import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { BCRYPT_SALT, JWT_TOKEN, JWT_EXPIRES_IN } from '../config/environment'
import { ROLES } from '../entities/types/roles'

interface userInfo {
  id: string,
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

    public static generateToken(user: userInfo): string {
      return jwt.sign({ user }, JWT_TOKEN, {
        expiresIn: JWT_EXPIRES_IN
      });
    }
  
    public static decodeToken(token: string) {
      return jwt.verify(token, JWT_TOKEN);
    }

}