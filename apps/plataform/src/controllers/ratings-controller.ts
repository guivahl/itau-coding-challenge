import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { RatingsService } from '../services/ratings-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { ratingCreateSchema } from '../entities/schemas/rating'
import { BaseController } from './base-controller'

@Controller('ratings')
export class RatingsController extends BaseController {
    private ratingService: RatingsService

    constructor() {
        super()
        this.ratingService = new RatingsService()
    }

    @Post()
    @Middleware(validationMiddleware(ratingCreateSchema))
    @Middleware(authMiddleware)
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, score } = request.body

        try {
            await this.ratingService.create({
                userId,
                movieId,
                score
            })

            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
    }

}