import { Controller, Get, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { MoviesService } from '../services/movies-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { getMovieCommentsSchema, getMovieSchema } from '../entities/schemas/movie'

@Controller('movies')
export class MoviesController {
    private moviesService: MoviesService

    constructor() {
        this.moviesService = new MoviesService()
    }

    @Get() 
    @Middleware(validationMiddleware(getMovieSchema))
    @Middleware(authMiddleware)
    public async getMovie(request: Request, response: Response): Promise<void> {
        const { movieName } = request.query 

        const movieAPIData = await this.moviesService.getMovieByName(movieName as string)
        
        const movie = await this.moviesService.findMovieOrCreate(movieAPIData.imdbID)

        response.status(StatusCodes.OK).json({ movieId: movie.id, ...movieAPIData })
    }

    @Get(':movieId/comments') 
    @Middleware(validationMiddleware(getMovieCommentsSchema))
    @Middleware(authMiddleware)
    public async getMovieComments(request: Request, response: Response): Promise<void> {
        const { movieId } = request.params

        const comments = await this.moviesService.getCommentsByMovie(movieId)

        response.status(StatusCodes.OK).json(comments)
    }
}