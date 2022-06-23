import prisma from '../prisma'
import { Movie } from '../../entities'

export class PrismaMoviesRepository {
    async findMovieByTitle (title: string): Promise<Movie | null> {
        const movie = await prisma.movie.findFirst({
            where: { 
                title: { 
                    contains: title,
                    mode: 'insensitive' 
                } 
        }
        })

        if (!movie) return null

        const { id: movieId, ...movieData } = movie

        return new Movie(movieData, movieId)
    }

    async create (movie: Movie): Promise<void> {
        await prisma.movie.create({
            data: {
                id: movie.id,        
                title: movie.title,
                year: movie.year,
                director: movie.director
            }
        })
    }
}