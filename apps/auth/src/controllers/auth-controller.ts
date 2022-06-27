import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { AuthService } from '../services/auth-service'
import { UsersService } from '../services/user-service'

@Controller('auth')
export class AuthController {
    private userService: UsersService

    constructor() {
        this.userService = new UsersService()
    }

    @Post('login')
    public async login(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body

        const user = await this.userService.getUserByEmail(email)

        if (!user) {
            response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
            return
        }
        
        const isValid = await AuthService.comparePassword(password, user.password)

        if (!isValid) {
            response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
            return
        }

        const tokenData = {
            id: user.id,
            role: user.role
        }

        const token = await AuthService.generateToken(tokenData)

        response.status(StatusCodes.CREATED).json({ token })
    }

    @Post('verify')
    public async verify(request: Request, response: Response): Promise<void> {
        const { token } = request.body

        try {
            const data = await AuthService.decodeToken(token)
    
            response.status(StatusCodes.CREATED).json({ data })
        } catch (err) {
            response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
        }
    }
}