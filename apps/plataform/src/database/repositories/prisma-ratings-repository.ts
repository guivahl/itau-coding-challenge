import prisma from '../prisma'
import { Rating } from '../../entities'

export class PrismaRatingsRepository {
    async create (rating: Rating): Promise<void> {
        await prisma.rating.create({
            data: {
                userId: rating.userId,
                movieId: rating.movieId,
                score: rating.score
            }
        })
    }
}