import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { UsersService } from '../services/users-service'
import { AuthService } from '../services/auth-service'

@Controller('users')
export class UsersController {
    private userService: UsersService
    private authService: AuthService

    constructor() {
        this.userService = new UsersService()
        this.authService = new AuthService()
    }

    @Post('login')
    public async login(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body

        try {
            const token = await this.authService.login(
                email,
                password
            )

            response.status(StatusCodes.CREATED).json({ token })
        } catch (error) {
            response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED })
        }
    }


    @Post()
    public async create(request: Request, response: Response): Promise<void> {
        const { firstName, email, password } = request.body

        await this.userService.create({
            firstName,
            email,
            password
        })

        response.status(StatusCodes.CREATED).end()
    }
}