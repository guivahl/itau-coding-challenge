import { PrismaRatingsRepository } from '../database/repositories/prisma-ratings-repository';
import { PrismaUsersRepository } from '../database/repositories/prisma-users-repository';

import { Rating } from '../entities'

interface createRatingInfo {
    userId: string
    movieId: string
    score: string
}

export class RatingsService {
    private ratingRepository: PrismaRatingsRepository
    private userRepository: PrismaUsersRepository

    constructor() {
        this.ratingRepository = new PrismaRatingsRepository()
        this.userRepository = new PrismaUsersRepository()
    }

    async create (ratingInfo: createRatingInfo): Promise<void> {
        const newRating = new Rating({
            userId: ratingInfo.userId,
            movieId: ratingInfo.movieId,
            score: ratingInfo.score
        })
        
        await this.ratingRepository.create(newRating)
        await this.userRepository.updatePoints(ratingInfo.userId)
    }
}