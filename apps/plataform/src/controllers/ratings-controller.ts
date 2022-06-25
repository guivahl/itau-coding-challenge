import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { RatingsService } from '../services/ratings-service'

@Controller('ratings')
export class RatingsController {
    private ratingService: RatingsService

    constructor() {
        this.ratingService = new RatingsService()
    }

    @Post()
    public async createRating(request: Request, response: Response): Promise<void> {
        const { userId, movieId, score } = request.body

        await this.ratingService.create({
            userId,
            movieId,
            score
        })

        response.status(StatusCodes.CREATED).end()
    }

}