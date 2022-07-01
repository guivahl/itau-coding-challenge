import { Controller, Get, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { MoviesService } from '../services/movies-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { getMovieCommentsSchema, getMovieSchema } from '../entities/schemas/movie'
import { BaseController } from './base-controller'

@Controller('movies')
export class MoviesController extends BaseController {
    private moviesService: MoviesService

    constructor() {
        super()
        this.moviesService = new MoviesService()
    }

    @Get() 
    @Middleware(validationMiddleware(getMovieSchema))
    @Middleware(authMiddleware)
    public async getMovie(request: Request, response: Response): Promise<void> {
        const { movieName } = request.query 
        try {
            const movieAPIData = await this.moviesService.getMovieByName(movieName as string)
            
            const movie = await this.moviesService.findMovieOrCreate(movieAPIData.imdbID)

            response.status(StatusCodes.OK).json({ movieId: movie.id, ...movieAPIData })
        }  catch (error) {
            const newError = this.errorHandler(error)
            response.status(newError.status).json({ message: newError.message })
        } 
    }

    @Get(':movieId/comments') 
    @Middleware(validationMiddleware(getMovieCommentsSchema))
    @Middleware(authMiddleware)
    public async getMovieComments(request: Request, response: Response): Promise<void> {
        const { movieId } = request.params
        try {
            const comments = await this.moviesService.getCommentsByMovie(movieId)
    
            response.status(StatusCodes.OK).json(comments)
        } catch (error) {
            const newError = this.errorHandler(error)
            response.status(newError.status).json({ message: newError.message })
        }
    }
}