import { AxiosStatic } from 'axios'

import { URL_AUTH_API } from '../config/environment'

interface loginResponse {
    token: string
}

interface verifyResponse {

}

export class AuthAPI {
    private request
    private AUTH_URL = URL_AUTH_API

    constructor(request: AxiosStatic) { 
        this.request = request
    }

    async login(email: string, password: string): Promise<loginResponse> {
        const response = await this.request
            .post<loginResponse>(`${this.AUTH_URL}/auth/login`, {
                email,
                password
            })

        return response.data
    }

    async verify(token: string): Promise<verifyResponse> {
        const response = await this.request
            .post<verifyResponse>(`${this.AUTH_URL}/auth/verify`, {
                token
            })

        return response.data
    }
}