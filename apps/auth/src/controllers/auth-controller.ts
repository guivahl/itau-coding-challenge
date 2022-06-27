import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

@Controller('auth')
export class AuthController {
    constructor() {
    }

    @Post('login')
    public async create(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body

        response.status(StatusCodes.CREATED).json({email, password})
    }

    @Post('verify')
    public async verify(request: Request, response: Response): Promise<void> {
        const { token } = request.body

        response.status(StatusCodes.CREATED).json({token})
    }
}