import prisma from '../prisma'
import { Movie } from '../../entities'

export class PrismaMoviesRepository {
    async findMovieByTitle (imdbID: string): Promise<Movie | null> {
        const movie = await prisma.movie.findFirst({
            where: { imdbID }
        })

        if (!movie) return null

        return new Movie({ imdbID: movie.imdbID }, movie.id)
    }

    async create (movie: Movie): Promise<void> {
        await prisma.movie.create({
            data: {
                id: movie.id,        
                imdbID: movie.imdbID
            }
        })
    }
}