import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { User } from '../entities'
import { UserService } from '../services/users-service'

@Controller('users')
export class UsersController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    @Post()
    public async createUser(request: Request, response: Response): Promise<void> {
        const { firstName, email, password } = request.body

        await this.userService.create({
            firstName,
            email,
            password
        })

        response.status(StatusCodes.CREATED).end()
    }
}