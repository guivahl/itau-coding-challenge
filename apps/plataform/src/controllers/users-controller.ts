import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { UsersService } from '../services/users-service'
import { AuthService } from '../services/auth-service'
import { roleAuthenticationMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { HttpUnauthorized } from '../utils/error'
import { userLoginSchema, userCreateSchema, updateUserRoleSchema } from '../entities/schemas/user'
import { ROLE_MODERADOR } from '../entities/types/roles'
import { BaseController } from './base-controller'

@Controller('users')
export class UsersController extends BaseController {
    private userService: UsersService
    private authService: AuthService

    constructor() {
        super()
        this.userService = new UsersService()
        this.authService = new AuthService()
    }

    @Post('login')
    @Middleware(validationMiddleware(userLoginSchema))
    public async login(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body

        try {
            const token = await this.authService.login(
                email,
                password
            )

            response.status(StatusCodes.OK).json({ token })
        } catch (error) {
            const newError = new HttpUnauthorized()
            response.status(newError.status).json({ message: newError.message })
        }
    }


    @Post()
    @Middleware(validationMiddleware(userCreateSchema))
    public async create(request: Request, response: Response): Promise<void> {
        const { firstName, lastName, email, password } = request.body

        try {
            await this.userService.create({
                firstName,
                lastName,
                email,
                password
            })
    
            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)
            response.status(newError.status).json({ message: newError.message })
        }
    }

    @Patch(':userId/roles/moderador')
    @Middleware(validationMiddleware(updateUserRoleSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_MODERADOR]))
    public async updateUserRole(request: Request, response: Response): Promise<void> {
        const { userId } = request.params
        try {
            await this.userService.updateRoleToModerador(userId)
    
            response.status(StatusCodes.OK).end()

        } catch (error) {
            const newError = this.errorHandler(error)
            response.status(newError.status).json({ message: newError.message })
        }
    }
}