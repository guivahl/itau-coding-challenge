import axios from 'axios'

import { PrismaCommentsRepository } from '../database/repositories/prisma-comments-repository';
import { PrismaMoviesRepository } from '../database/repositories/prisma-movies-repository';
import { MovieAPI } from '../clients/movies-api-client';

import { Movie } from '../entities'
import { CommentProps } from '../entities/comment'

export class MoviesService {
    private commentRepository: PrismaCommentsRepository
    private movieRepository: PrismaMoviesRepository
    private movieApi: MovieAPI

    constructor() {
        this.commentRepository = new PrismaCommentsRepository()
        this.movieRepository = new PrismaMoviesRepository()
        this.movieApi = new MovieAPI(axios)
    }

    async getCommentsByMovie (movieId: string): Promise<CommentProps[]> {
        const comments = await this.commentRepository.findCommentsByMovie(movieId)
        
        return comments.map(comment => comment.commentProps)
    }

    async getMovieByName (movieName: string) {
        const movieInfo = await this.movieApi.fetchMovieByName(movieName)

        return movieInfo
    }

    async findMovieOrCreate (imdbID: string): Promise<Movie> {
        const movie = await this.movieRepository.findMovieById(imdbID)
    
        if (movie) return new Movie(movie, movie.id)

        const newMovie = new Movie({ imdbID })

        await this.movieRepository.create(newMovie)

        return newMovie
    }
}