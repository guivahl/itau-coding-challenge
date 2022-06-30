import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { RatingsService } from '../services/ratings-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { ratingCreateSchema } from '../entities/schemas/rating'

@Controller('ratings')
export class RatingsController {
    private ratingService: RatingsService

    constructor() {
        this.ratingService = new RatingsService()
    }

    @Post()
    @Middleware(validationMiddleware(ratingCreateSchema))
    @Middleware(authMiddleware)
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, score } = request.body
        
        await this.ratingService.create({
            userId,
            movieId,
            score
        })

        response.status(StatusCodes.CREATED).end()
    }

}