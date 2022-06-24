import bcrypt from 'bcrypt'
import { BCRYPT_SALT } from '../config/environment'

export default class AuthService {
    static async hashPassword(password: string, salt = BCRYPT_SALT): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}