import { Controller, Get, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { MoviesService } from '../services/movies-service'
import { authMiddleware } from '../middlewares/auth-middleware'

@Controller('movies')
export class MoviesController {
    private moviesService: MoviesService

    constructor() {
        this.moviesService = new MoviesService()
    }

    @Get(':movieId/comments') 
    @Middleware(authMiddleware)
    public async getMovieComments(request: Request, response: Response): Promise<void> {
        const { movieId } = request.params

        const comments = await this.moviesService.getCommentsByMovie(movieId)

        response.status(StatusCodes.OK).json(comments)
    }
}