import bcrypt from 'bcrypt'
import axios from 'axios'

import { BCRYPT_SALT } from '../config/environment'
import { AuthAPI } from '../clients/auth-api-client';

export class AuthService {
    private authAPI: AuthAPI

    constructor() { 
        this.authAPI = new AuthAPI(axios);
    }

    static async hashPassword(password: string, salt = BCRYPT_SALT): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async login (email: string, password: string): Promise<string> {
        const responseData = await this.authAPI.login(email, password)

        return responseData.token
    }
}