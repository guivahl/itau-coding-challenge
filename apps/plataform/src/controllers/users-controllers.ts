import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'

@Controller('users')
export class UsersController {
    @Post()
    public createUser(request: Request, response: Response): void {
        response.send({ test: true })
    }
}